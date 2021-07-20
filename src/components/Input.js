import React, {useState} from "react"
import classes from './Input.module.css'
import firebase from 'firebase/app'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyC8AziQqIuCxen4CltoJtDlHyasuJQ07Tc",
    authDomain: "fe-upload-2e2f7.firebaseapp.com",
    projectId: "fe-upload-2e2f7",
    storageBucket: "fe-upload-2e2f7.appspot.com",
    messagingSenderId: "72240540527",
    appId: "1:72240540527:web:4d17844fa1483d96e6569a"
};

firebase.initializeApp(firebaseConfig);
let storage = firebase.storage()

function Input(props) {
    let [filesImage, setFilesImage] = useState([])
    let files = []
    function formatSizeUnits(bytes) {
        if (bytes >= 1073741824) {
            bytes = (bytes / 1073741824).toFixed(2) + " GB";
        } else if (bytes >= 1048576) {
            bytes = (bytes / 1048576).toFixed(2) + " MB";
        } else if (bytes >= 1024) {
            bytes = (bytes / 1024).toFixed(2) + " KB";
        } else if (bytes > 1) {
            bytes = bytes + " bytes";
        } else if (bytes === 1) {
            bytes = bytes + " byte";
        } else {
            bytes = "0 bytes";
        }
        return bytes;
    }


    let inputHandler = evt => {

        files = Array.from(evt.target.files)
        setFilesImage([...files])
        let list = document.querySelector('#ulList')
        list.innerHTML = ''
        files.forEach((image, i) => {

            let reader = new FileReader()
            reader.onload = evt => {
                let img = evt.target.result
                list.insertAdjacentHTML('afterbegin', `
                    <li id="preview">   
                        <img src=${img} alt=${image.name}>
                        <button class=${classes.closeBtn}
                            data-name=${image.name}
                            id="closeAreaImage"
                        >
                            X
                        
                        </button>
                        <div class=${classes.info_div} id="info_div">
                            <span>Name: ${image.name}, size: ${formatSizeUnits(image.size)})</span>
                            
                        </div>
                        
                    </li>
                `)
            }
            reader.readAsDataURL(image)
        })

        list.addEventListener('click', evt => {
            if (!evt.target.dataset.name) {
                return
            }
            let {name} = evt.target.dataset
            files = files.filter(image => image.name !== name)
            setFilesImage([...files])
            let block = list.querySelector(`[data-name="${name}"]`).closest('#preview')
            block.style.transform = 'scale(0.0)';
            setTimeout(() => {
                block.remove()
            }, 400)

        })


    }

    let onUploadHandler = files => {
        let allCloseBtn = document.querySelectorAll('#closeAreaImage')
        allCloseBtn.forEach(el => {
            el.remove()
        })
        let previewBlock = document.querySelectorAll('#info_div')
        previewBlock.forEach(el => el.innerHTML =
            `<div id="div_info" class=${classes.preview_info_progress}>
                <span>Прогресс</span>
            </div>`)
        uploadBackend(files)
    }

    let uploadBackend = files => {
        let divInfo =  document.querySelectorAll('#div_info')
        files.forEach((file, el) => {
            let ref = storage.ref(`images/${file.name}`)
            let task = ref.put(file)
            task.on('state_changed', snapshot => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                divInfo[el].style.width = `${percentage}%`

            }, error => {
                console.log(error)
            }, () => {

                task.snapshot.ref.getDownloadURL().then(url => {
                    divInfo[el].insertAdjacentHTML('afterend', `
                    <a href="${url}">Ссылка на это фото</a>
                `)
                })
                divInfo[el].textContent = 'Загружено успешно'


            })
        })
    }

    return (
        <div className={classes.Input}>
            <input
                type="file"
                id='input'
                accept={props.accept.join(',')}
                multiple={props.multi}
                onChange={evt => inputHandler(evt)}
            />
            <div className='btn_area'>
                <label htmlFor="input">Открыть</label>
                {filesImage.length ? <button
                    className={classes.btn}
                    onClick={() => onUploadHandler(filesImage)}
                >
                    Загрузить
                </button> : null}


            </div>

            <ul id="ulList">

            </ul>


        </div>
    )
}


export default Input