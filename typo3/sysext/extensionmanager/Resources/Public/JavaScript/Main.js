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
define(["require","exports","jquery","nprogress","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Tooltip","TYPO3/CMS/Backend/Severity","TYPO3/CMS/Core/SecurityUtility","./Repository","./Update","./UploadForm","datatables","TYPO3/CMS/Backend/Input/Clearable"],function(e,t,n,a,i,o,r,s,l,c,d){"use strict";const p=new s;var u;!function(e){e.extensionlist="#typo3-extension-list",e.searchField="#Tx_Extensionmanager_extensionkey"}(u||(u={}));class m{constructor(){this.bindExtensionListActions=(()=>{n(".removeExtension").not(".transformed").each((e,t)=>{const a=n(t);a.data("href",a.attr("href")),a.attr("href","#"),a.addClass("transformed"),a.click(()=>{i.confirm(TYPO3.lang["extensionList.removalConfirmation.title"],TYPO3.lang["extensionList.removalConfirmation.question"],r.error,[{text:TYPO3.lang["button.cancel"],active:!0,btnClass:"btn-default",trigger:()=>{i.dismiss()}},{text:TYPO3.lang["button.remove"],btnClass:"btn-danger",trigger:()=>{this.removeExtensionFromDisk(a),i.dismiss()}}])})})}),n(()=>{n.fn.dataTableExt.oSort["extension-asc"]=((e,t)=>m.extensionCompare(e,t)),n.fn.dataTableExt.oSort["extension-desc"]=((e,t)=>{return-1*m.extensionCompare(e,t)}),n.fn.dataTableExt.oSort["version-asc"]=((e,t)=>{return-1*m.versionCompare(e,t)}),n.fn.dataTableExt.oSort["version-desc"]=((e,t)=>m.versionCompare(e,t)),this.Update=new c,this.UploadForm=new d,this.Repository=new l;const e=this.manageExtensionListing();let t;n(document).on("click",".onClickMaskExtensionManager",()=>{a.start()}).on("click","a[data-action=update-extension]",e=>{e.preventDefault(),n.ajax({url:n(this).attr("href"),dataType:"json",beforeSend:()=>{a.start()},success:this.updateExtension})}).on("change","input[name=unlockDependencyIgnoreButton]",e=>{n(".t3js-dependencies").toggleClass("disabled",!n(e.currentTarget).prop("checked"))}),null!==(t=document.querySelector(u.searchField))&&t.clearable({onClear:()=>{e.search("").draw()}}),n(document).on("click",".t3-button-action-installdistribution",()=>{a.start()}),this.Repository.initDom(),this.Update.initializeEvents(),this.UploadForm.initializeEvents(),o.initialize("#typo3-extension-list [title]",{delay:{show:500,hide:100},trigger:"hover",container:"body"})})}static getUrlVars(){let e,t=[],n=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");for(let a=0;a<n.length;a++)e=n[a].split("="),t.push(e[0]),t[e[0]]=e[1];return t}static versionCompare(e,t){if(e===t)return 0;const n=e.split("."),a=t.split("."),i=Math.min(n.length,a.length);for(let e=0;e<i;e++){if(parseInt(n[e],10)>parseInt(a[e],10))return 1;if(parseInt(n[e],10)<parseInt(a[e],10))return-1}return n.length>a.length?1:n.length<a.length?-1:0}static extensionCompare(e,t){const n=document.createElement("div");n.innerHTML=e;const a=n.textContent||n.innerText||e;n.innerHTML=t;const i=n.textContent||n.innerText||t;return a.trim().localeCompare(i.trim())}manageExtensionListing(){const e=n(u.searchField),t=n(u.extensionlist).DataTable({paging:!1,dom:"lrtip",lengthChange:!1,pageLength:15,stateSave:!0,drawCallback:this.bindExtensionListActions,columns:[null,null,{type:"extension"},null,{type:"version"},{orderable:!1},null,null]});e.parents("form").on("submit",()=>!1);const a=m.getUrlVars(),i=a.search?a.search:t.search();return e.val(i),e.on("input",e=>{t.search(n(e.currentTarget).val()).draw()}),t}removeExtensionFromDisk(e){n.ajax({url:e.data("href"),beforeSend:()=>{a.start()},success:()=>{location.reload()},complete:()=>{a.done()}})}updateExtension(e){let t=0;const o=n("<form>");n.each(e.updateComments,(e,a)=>{const i=n("<input>").attr({type:"radio",name:"version"}).val(e);0===t&&i.attr("checked","checked"),o.append([n("<h3>").append([i," "+p.encodeHtml(e)]),n("<div>").append(a.replace(/(\r\n|\n\r|\r|\n)/g,"\n").split(/\n/).map(e=>p.encodeHtml(e)).join("<br>"))]),t++});const s=n("<div>").append([n("<h1>").text(TYPO3.lang["extensionList.updateConfirmation.title"]),n("<h2>").text(TYPO3.lang["extensionList.updateConfirmation.message"]),o]);a.done(),i.confirm(TYPO3.lang["extensionList.updateConfirmation.questionVersionComments"],s,r.warning,[{text:TYPO3.lang["button.cancel"],active:!0,btnClass:"btn-default",trigger:()=>{i.dismiss()}},{text:TYPO3.lang["button.updateExtension"],btnClass:"btn-warning",trigger:()=>{n.ajax({url:e.url,data:{tx_extensionmanager_tools_extensionmanagerextensionmanager:{version:n("input:radio[name=version]:checked",i.currentModal).val()}},dataType:"json",beforeSend:()=>{a.start()},complete:()=>{location.reload()}}),i.dismiss()}}])}}let g=new m;return void 0===TYPO3.ExtensionManager&&(TYPO3.ExtensionManager=g),g});