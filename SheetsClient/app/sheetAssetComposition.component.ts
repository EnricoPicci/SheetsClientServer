import {Component} from 'angular2/core';

import {Sheet} from './sheet';
import {AssetGroup} from './assetGroup';
import {Asset} from './asset';
import {AssetAbstract} from './assetAbstract';

import {Slider} from '../utilities/slider.component'
import {SheetWeightAdjuster} from './sheetWeightAdjuster.service';
import {SheetReturnData} from './sheetReturnData.component'
import {SheetCompositionCharts} from './sheetCompositionCharts.component'

import {UserLogged} from './userLogged';
import {SheetBackEnd} from './sheetBackEnd.service';

@Component({
    selector: 'sheet-assetComposition',
	providers: [],
    templateUrl: '../templates/sheetAssetComposition.html',
    styleUrls: ['../styles/common.css', '../styles/sheetDetail.css'],
	directives: [Slider, SheetReturnData, SheetCompositionCharts],
    inputs: ['sheet'],
})
export class SheetAssetCompositionComponent { 
    public sheet: Sheet;
    
    public editStatus = false;
    public isChanged = false;
    public startOfScaleRelative = false;  // if false, all sliders start from ZERO, otherwise their starting position increases based on the sum of the range of the previous assets
    
    constructor(
        private _sheetWeightAdjuster: SheetWeightAdjuster, 
        private _userLogged: UserLogged,
        private _sheetBackEnd: SheetBackEnd
    ) { }
       
    onAssetGroupClick(inAssetGroup: AssetGroup) {
        inAssetGroup.show = !inAssetGroup.show;
    }
    
    onClickOverCustomizeButton() {
        this.editStatus = !this.editStatus;
    }
    
    getCustomizeButtonText() {
        let ret: string;
        if (this.editStatus) {
            ret = 'Chiudi';
        } else {
            ret = 'Personalizza';
        }
        return ret;
    }
    
    onClickOverRelativeScaleButton() {
        this.startOfScaleRelative = !this.startOfScaleRelative;
        this._sheetWeightAdjuster.setRelativeStartOfScale(this.sheet.assetGroups);
    }
    
    getRelativeScaleButtonText() {
        let ret: string;
        if (this.startOfScaleRelative) {
            ret = 'Scala assoluta';
        } else {
            ret = 'Scala relativa';
        }
        return ret;        
    }
    
    onToggleLock(inAsset: AssetAbstract) {
        inAsset.setLocked(!inAsset.locked);
    }
    
    getStart(inAsset: Asset) {
        return inAsset.weight;
    }
    
    getRange(inAsset: AssetAbstract) {
        return inAsset.range;
    }
    
    getPips(inAsset: AssetAbstract) {
        return inAsset.pips;
    }
    
    onEndOnAssetGroup(inEvent: number[], inAssetGroup: AssetGroup) {
        let newWeightValue = inEvent[0];
        this._sheetWeightAdjuster.adjustAfterChangeInAssetGroupWeight(newWeightValue, inAssetGroup, this.sheet);
        this._sheetWeightAdjuster.setRelativeStartOfScale(this.sheet.assetGroups);
        this.sheet.emitChangeCompositionEvent();
        this.changed();
    }
    
    onEndOnAsset(inEvent: number[], inAsset: Asset, inAssetGroup: AssetGroup) {
        let newWeightValue = inEvent[0];
        this._sheetWeightAdjuster.adjustAfterChangeInAssetWeight(newWeightValue, inAsset, inAssetGroup);
        this._sheetWeightAdjuster.setRelativeStartOfScale(this.sheet.assetGroups);
        this.sheet.emitChangeCompositionEvent();
        this.changed();
    }
    
    changed() {
        this.isChanged = true;
        this.sheet.personalized(this._userLogged);
    }
    
    onClickOverSaveButton() {
        this._sheetBackEnd.addSheet(this.sheet)
            .subscribe(
                data => {this.isChanged= false; 
                    let retJson = data.json();
                    this.sheet.id = retJson.id;
                    console.log('Data received after Save --- ' + JSON.stringify(retJson))},
                err => console.error(err),
                () => console.log('Save Complete')
            );
    }
     
}