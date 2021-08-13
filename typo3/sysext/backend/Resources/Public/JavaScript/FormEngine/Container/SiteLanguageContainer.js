/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
define(["require","exports","../../Utility/MessageUtility","./../InlineRelation/AjaxDispatcher","nprogress","TYPO3/CMS/Backend/FormEngine","TYPO3/CMS/Backend/FormEngineValidation","../../Modal","../../Notification","TYPO3/CMS/Core/Event/RegularEvent","../../Severity","../../Utility"],(function(e,t,n,i,o,r,s,a,l,c,d,u){"use strict";var h,p,g;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.toggleSelector='[data-bs-toggle="formengine-inline"]',e.controlSectionSelector=".t3js-formengine-irre-control",e.createNewRecordButtonSelector=".t3js-create-new-button",e.createNewRecordBySelectorSelector=".t3js-create-new-selector",e.deleteRecordButtonSelector=".t3js-editform-delete-inline-record"}(h||(h={})),function(e){e.new="inlineIsNewRecord",e.visible="panel-visible",e.collapsed="panel-collapsed",e.notLoaded="t3js-not-loaded"}(p||(p={})),function(e){e.structureSeparator="-"}(g||(g={}));class m extends HTMLElement{constructor(){super(...arguments),this.container=null,this.ajaxDispatcher=null,this.requestQueue={},this.progessQueue={},this.handlePostMessage=e=>{if(!n.MessageUtility.verifyOrigin(e.origin))throw"Denied message sent by "+e.origin;if("typo3:foreignRelation:insert"===e.data.actionName){if(void 0===e.data.objectGroup)throw"No object group defined for message";if(e.data.objectGroup!==this.container.dataset.objectGroup)return;if(this.isUniqueElementUsed(parseInt(e.data.uid,10)))return void l.error("There is already a relation to the selected element");this.importRecord([e.data.objectGroup,e.data.uid]).then(()=>{if(e.source){const t={actionName:"typo3:foreignRelation:inserted",objectGroup:e.data.objectId,table:e.data.table,uid:e.data.uid};n.MessageUtility.send(t,e.source)}})}}}static getInlineRecordContainer(e){return document.querySelector('[data-object-id="'+e+'"]')}static getValuesFromHashMap(e){return Object.keys(e).map(t=>e[t])}static selectOptionValueExists(e,t){return null!==e.querySelector('option[value="'+t+'"]')}static removeSelectOptionByValue(e,t){const n=e.querySelector('option[value="'+t+'"]');null!==n&&n.remove()}static reAddSelectOption(e,t,n){if(m.selectOptionValueExists(e,t))return;const i=e.querySelectorAll("option");let o=-1;for(let e of Object.keys(n.possible)){if(e===t)break;for(let t=0;t<i.length;++t){if(i[t].value===e){o=t;break}}}-1===o?o=0:o<i.length&&o++;const r=document.createElement("option");r.text=n.possible[t],r.value=t,e.insertBefore(r,e.options[o])}static collapseExpandRecord(e){const t=m.getInlineRecordContainer(e),n=document.querySelector('[aria-controls="'+e+'_fields"]');t.classList.contains(p.collapsed)?(t.classList.remove(p.collapsed),t.classList.add(p.visible),n.setAttribute("aria-expanded","true")):(t.classList.remove(p.visible),t.classList.add(p.collapsed),n.setAttribute("aria-expanded","false"))}connectedCallback(){const e=this.getAttribute("identifier")||"";this.container=this.querySelector("#"+e),null!==this.container&&(this.ajaxDispatcher=new i.AjaxDispatcher(this.container.dataset.objectGroup),this.registerEvents())}registerEvents(){this.registerCreateRecordButton(),this.registerCreateRecordBySelector(),this.registerRecordToggle(),this.registerDeleteButton(),new c("message",this.handlePostMessage).bindTo(window)}registerCreateRecordButton(){const e=this;new c("click",(function(t){var n,i;t.preventDefault(),t.stopImmediatePropagation();let o=e.container.dataset.objectGroup;void 0!==this.dataset.recordUid&&(o+=g.structureSeparator+this.dataset.recordUid),e.importRecord([o,null===(n=e.container.querySelector(h.createNewRecordBySelectorSelector))||void 0===n?void 0:n.value],null!==(i=this.dataset.recordUid)&&void 0!==i?i:null)})).delegateTo(this.container,h.createNewRecordButtonSelector)}registerCreateRecordBySelector(){const e=this;new c("change",(function(t){t.preventDefault(),t.stopImmediatePropagation();const n=this.options[this.selectedIndex].getAttribute("value");e.importRecord([e.container.dataset.objectGroup,n])})).delegateTo(this.container,h.createNewRecordBySelectorSelector)}registerRecordToggle(){const e=this;new c("click",(function(t){t.preventDefault(),t.stopImmediatePropagation(),e.loadRecordDetails(this.closest(h.toggleSelector).parentElement.dataset.objectId)})).delegateTo(this.container,`${h.toggleSelector} .form-irre-header-cell:not(${h.controlSectionSelector}`)}registerDeleteButton(){const e=this;new c("click",(function(t){t.preventDefault(),t.stopImmediatePropagation();const n=TYPO3.lang["label.confirm.delete_record.title"]||"Delete this record?",i=TYPO3.lang["label.confirm.delete_record.content"]||"Are you sure you want to delete this record?";a.confirm(n,i,d.warning,[{text:TYPO3.lang["buttons.confirm.delete_record.no"]||"Cancel",active:!0,btnClass:"btn-default",name:"no"},{text:TYPO3.lang["buttons.confirm.delete_record.yes"]||"Yes, delete this record",btnClass:"btn-warning",name:"yes",trigger:()=>{e.deleteRecord(this.closest("[data-object-id]").dataset.objectId),a.currentModal.trigger("modal-dismiss")}}])})).delegateTo(this.container,h.deleteRecordButtonSelector)}createRecord(e,t,n=null,i=null){let o=this.container.dataset.objectGroup;null!==n?(o+=g.structureSeparator+n,m.getInlineRecordContainer(o).insertAdjacentHTML("afterend",t),this.memorizeAddRecord(e,n,i)):(document.getElementById(this.container.getAttribute("id")+"_records").insertAdjacentHTML("beforeend",t),this.memorizeAddRecord(e,null,i))}async importRecord(e,t){return this.ajaxDispatcher.send(this.ajaxDispatcher.newRequest(this.ajaxDispatcher.getEndpoint("site_configuration_inline_create")),e).then(async e=>{this.createRecord(e.compilerInput.uid,e.data,void 0!==t?t:null,void 0!==e.compilerInput.childChildUid?e.compilerInput.childChildUid:null)})}loadRecordDetails(e){const t=document.getElementById(e+"_fields"),n=m.getInlineRecordContainer(e),i=void 0!==this.requestQueue[e];if(null!==t&&!n.classList.contains(p.notLoaded))m.collapseExpandRecord(e);else{const o=this.getProgress(e,n.dataset.objectIdHash);if(i)this.requestQueue[e].abort(),delete this.requestQueue[e],delete this.progessQueue[e],o.done();else{const i=this.ajaxDispatcher.newRequest(this.ajaxDispatcher.getEndpoint("site_configuration_inline_details"));this.ajaxDispatcher.send(i,[e]).then(async i=>{delete this.requestQueue[e],delete this.progessQueue[e],n.classList.remove(p.notLoaded),t.innerHTML=i.data,m.collapseExpandRecord(e),o.done(),r.reinitialize(),s.initializeInputFields(),s.validate(this.container),this.removeUsed(m.getInlineRecordContainer(e))}),this.requestQueue[e]=i,o.start()}}}memorizeAddRecord(e,t=null,n=null){const i=this.getFormFieldForElements();if(null===i)return;let o=u.trimExplode(",",i.value);if(t){const n=[];for(let i=0;i<o.length;i++)o[i].length&&n.push(o[i]),t===o[i]&&n.push(e);o=n}else o.push(e);i.value=o.join(","),i.classList.add("has-change"),document.dispatchEvent(new Event("change")),this.setUnique(e,n),r.reinitialize(),s.initializeInputFields(),s.validate(this.container)}memorizeRemoveRecord(e){const t=this.getFormFieldForElements();if(null===t)return[];let n=u.trimExplode(",",t.value);const i=n.indexOf(e);return i>-1&&(delete n[i],t.value=n.join(","),t.classList.add("has-change"),document.dispatchEvent(new Event("change"))),n}deleteRecord(e,t=!1){const n=m.getInlineRecordContainer(e),i=n.dataset.objectUid;if(n.classList.add("t3js-inline-record-deleted"),!n.classList.contains(p.new)&&!t){const e=this.container.querySelector('[name="cmd'+n.dataset.fieldName+'[delete]"]');e.removeAttribute("disabled"),n.parentElement.insertAdjacentElement("afterbegin",e)}new c("transitionend",()=>{n.parentElement.removeChild(n),s.validate(this.container)}).bindTo(n),this.revertUnique(i),this.memorizeRemoveRecord(i),n.classList.add("form-irre-object--deleted")}getProgress(e,t){const n="#"+t+"_header";let i;return void 0!==this.progessQueue[e]?i=this.progessQueue[e]:(i=o,i.configure({parent:n,showSpinner:!1}),this.progessQueue[e]=i),i}getFormFieldForElements(){const e=document.getElementsByName(this.container.dataset.formField);return e.length>0?e[0]:null}isUniqueElementUsed(e){const t=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup];return-1!==m.getValuesFromHashMap(t.used).indexOf(e)}removeUsed(e){const t=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup],n=m.getValuesFromHashMap(t.used);let i=e.querySelector('[name="data['+t.table+"]["+e.dataset.objectUid+"]["+t.field+']"]');if(null!==i){const e=i.options[i.selectedIndex].value;for(let t of n)t!==e&&m.removeSelectOptionByValue(i,t)}}setUnique(e,t){const n=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup],i=document.getElementById(this.container.dataset.objectGroup+"_selector");if(-1!==n.max){const o=this.getFormFieldForElements(),r=this.container.dataset.objectGroup+g.structureSeparator+e;let s=m.getInlineRecordContainer(r).querySelector('[name="data['+n.table+"]["+e+"]["+n.field+']"]');const a=m.getValuesFromHashMap(n.used);if(null!==i){if(null!==s)for(let e of a)m.removeSelectOptionByValue(s,e);for(let e of a)m.removeSelectOptionByValue(s,e);void 0!==n.used.length&&(n.used={}),n.used[e]={table:n.elTable,uid:t}}if(null!==o&&m.selectOptionValueExists(i,t)){const i=u.trimExplode(",",o.value);for(let o of i)s=document.querySelector('[name="data['+n.table+"]["+o+"]["+n.field+']"]'),null!==s&&o!==e&&m.removeSelectOptionByValue(s,t)}}m.selectOptionValueExists(i,t)&&(m.removeSelectOptionByValue(i,t),n.used[e]={table:n.elTable,uid:t})}revertUnique(e){const t=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup],n=this.container.dataset.objectGroup+g.structureSeparator+e,i=m.getInlineRecordContainer(n);let o,r=i.querySelector('[name="data['+t.table+"]["+i.dataset.objectUid+"]["+t.field+']"]');if(null!==r)o=r.value;else{if(""===i.dataset.tableUniqueOriginalValue)return;o=i.dataset.tableUniqueOriginalValue.replace(t.table+"_","")}if(!isNaN(parseInt(o,10))&&0x8000000000000000!==parseInt(o,10)){const e=document.getElementById(this.container.dataset.objectGroup+"_selector");m.reAddSelectOption(e,o,t)}if(-1===t.max)return;const s=this.getFormFieldForElements();if(null===s)return;const a=u.trimExplode(",",s.value);let l;for(let e=0;e<a.length;e++)l=document.querySelector('[name="data['+t.table+"]["+a[e]+"]["+t.field+']"]'),null!==l&&m.reAddSelectOption(l,o,t);delete t.used[e]}}window.customElements.define("typo3-formengine-container-sitelanguage",m)}));