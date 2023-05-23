import React, {} from 'react';
import EditorJS from '@editorjs/editorjs';
import SimpleImage from './simple-image';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import Embed from '@editorjs/embed';
import notifier from "codex-notifier";

    const getNumOfBlock = (elem) => {
        let findedIndex = -1;
        Array.from(document.querySelector(".codex-editor__redactor").children).forEach((item, index) => {
            if (item.isEqualNode(elem)){
                findedIndex = index;
            }
        })
        return findedIndex;
    }
    
    class PinBlock {
        constructor(api){
            this._pinned = {}
            this._api = api;
        }
    
        getBlock() {
            return this._block
        }
    
        getPinnedBlocks() {
            this._api.configuration.data.blocks.forEach((block, index) => {
                if (block.data.fixed === true){
                    this._pinned[index] = this._api.blocks.getBlockByIndex(index);
                }
            })
        }
    
        updateAllBlocks() {
            this.allBlocks = this.getAllBlocks();
        }
    
        getAllBlocks(){
            return Array.from(document.querySelectorAll(".ce-block"));
        }
    
    
        hidePopovers() {
            try {
                const popoverItems = Array.from(document.querySelector(".ce-popover--opened .ce-popover__items")?.children);
                const cleanPopovers = ['move-up', 'delete', 'move-down'];
                popoverItems.forEach((item) => {
                    if (cleanPopovers.includes(item.getAttribute("data-item-name"))){
                        item.style.display = "none";
                    }
                });
            } catch (e){}
            
        }
    
        hideTunesBlock() {
            const toolbar = document.querySelector(".ce-toolbar");        
            this.updateAllBlocks();
            document.querySelector(".codex-editor__redactor").addEventListener("mouseover", (e) => {
                let flag = false;
                this.allBlocks.forEach((item, index) => {
                    const isToolboxOpened = document.querySelector(".codex-editor--toolbox-opened") ?? false;
                    const isSelection = document.querySelector(".ce-block--selected") ?? false;
                    const isOnlyFixedBlocks = this.getLastIndexOfPinnedBlocks() + 1 == this.allBlocks.length
                    if (e.composedPath().indexOf(item) != -1 && index in Object.keys(this._pinned) && !isSelection && !isToolboxOpened || isOnlyFixedBlocks){
                        flag = true;
                    }
                if (flag === true)
                    toolbar.classList.add("hidden");
                else toolbar.classList.remove("hidden");
            })
            }, true)
        }
        
        getLastIndexOfPinnedBlocks(){
            return Number(Object.keys(this._pinned).slice(-1));
        }
    
        getConfig () {
            return this._block.config
        }
    }
    
    let blockToPin;
    
    console.log("Начальные блоки создались");

    const editor = new EditorJS({
        holder: "editorjs",
      

            tools: {
              
            list: {
                class: List,
                inlineToolbar: ['link']
            },
            header: {
                class: Header,
                inlineToolbar: ['link', 'bold']
            },
            embed: {
                class: Embed,
                inlineToolbar: false,
                config: {
                    services: {
                        youtube: true
                    }
                }
            },
              image: {
                class: SimpleImage,
                inlineToolbar: ['link']
              }
            },
            autofocus: true,
            data:
                {
                  
                  "time": 1643195431504,
                  "blocks": [
                      {
                          "id": "o72AO0sY-1",
                          "type": "paragraph",
                          "data": {
                              "text": "Утро в сосновом лесу",
                              fixed:true,
                          }
                      },
                     {
                            "type": "image",
                            "data": {
                            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Shishkin%2C_Ivan_-_Morning_in_a_Pine_Forest.jpg/400px-Shishkin%2C_Ivan_-_Morning_in_a_Pine_Forest.jpg",
                            "caption": "Описание",
                            fixed: true,               
                          }
                      }
                  ],
                  "version": "2.26.5"
                },


        // Изменение - добавление и перенос блока
        onChange: (api, event) => {
            const lastIndexOfPinnedBlocks = blockToPin.getLastIndexOfPinnedBlocks()
            // eslint-disable-next-line default-case
            switch(event.type){
                case 'block-added':
                    if (event.detail.index <= lastIndexOfPinnedBlocks){
                        notifier.show({
                            message:"Данный блок нельзя добавлять выше закрепленного",
                            style: "error",
                        })
                        api.blocks.delete(event.detail.index);
                    }
                    else blockToPin.updateAllBlocks();
                    break;
                
                case 'block-moved':
                    if (event.detail.toIndex == lastIndexOfPinnedBlocks){
                        notifier.show({
                            message:"Данный блок нельзя менять местами с закрепленным",
                            style: "error",
                        });
                        api.blocks.move(lastIndexOfPinnedBlocks + 1);
                    }
                    break;
            } 
        }
    });
    
    blockToPin = new PinBlock(editor);
    
    editor.isReady
        .then(() => {
            let lastFocused;
            const target = document.querySelector(".codex-editor__redactor");
            const observer = new MutationObserver((mutations) => {
                let findedBlock;
                mutations.forEach((mutationRecord) =>{
                    if (mutationRecord.target.classList.contains("ce-block--selected")){
                        findedBlock = mutationRecord.target;
                    }
                });
                lastFocused = getNumOfBlock(findedBlock) !== -1 ? getNumOfBlock(findedBlock) : lastFocused;
                if (lastFocused <= blockToPin.getLastIndexOfPinnedBlocks()){
                    blockToPin.hidePopovers()
                }
              });
      
              observer.observe(target, {
                subtree: true,
                childList: true,
                attributeFilter: ['class'],
                attributes: true
              });
              
            blockToPin.getPinnedBlocks(); // доходим до проверки
        })
        .catch(error => {
            console.log(error);
        }) 


    // Сохранение - вывод JSON
    const onSave = ()=>{
        editor.save().then((outputData) => {
            console.log('Article data: ', outputData)
            }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    };
   
const Editor = () => {

  return (
      <div>
          <h1>Тестовое задание involta</h1>
          <h1>Editor</h1>
          <button onClick={onSave}>Сохранить</button>
          <div className='container'></div>
          <div id="editorjs"></div>
      </div>
  );
};

export default Editor;