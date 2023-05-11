import SimpleImage from './simple-image';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import Embed from '@editorjs/embed';

    const Configuration = () => {
        return ({

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

              onReady: () => {
              console.log("EditorJS готов к работе!")
              },
              onChange: (api, event) => {
                console.log('Теперь я знаю что содержимое Editor\'s изменилось!', event)
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
                                "text": "Утро в сосновом лесу"
                            }
                        },
                       {
                              "type": "image",
                              "data": {
                              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Shishkin%2C_Ivan_-_Morning_in_a_Pine_Forest.jpg/400px-Shishkin%2C_Ivan_-_Morning_in_a_Pine_Forest.jpg",
                              "caption": "Описание"                          
                            }
                        }
                    ],
                    "version": "2.26.5"
                  },
        });
      };
      
      export default Configuration;