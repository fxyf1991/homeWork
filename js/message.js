!function () {
    var model = {
        init: function () {
            var APP_ID = '3zmu3x4gLF1FHrcwyXg6M4as-gzGzoHsz';
            var APP_KEY = 'H5XlhYOArypCt8iUxHF4WfuA';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY,
            })
        },
        fetch: function () {
            var query = new AV.Query('Message')
            return query.find()
        },
        save: function (name, content) {
            var Message = AV.Object.extend('Message')
            var message = new Message()
            return message.save({
                'name': name,
                'content': content
            })
        }
    }
        var view = document.querySelector('section.message')
        var controller = {
            view:null,
            model:null,
            mentionList:null,
            init:function (view, model) {
                this.view = view
                this.model = model
                this.messageList = view.querySelector('#messageList')
                this.form = view.querySelector('form')
                this.model.init()
                this.loadMessages()
                this.bindEvents()
            },
            loadMessages: function () {
                this.model.fetch().then(
                    (messages) => {
                        let array = messages.map((item)=>item.attributes)
                        array.forEach((item)=>{
                            let li = document.createElement('li')
                            li.innerText = `${item.name} : ${item.content}`
                            this.messageList.insertBefore(li,messageList.firstChild)
                        })
                    }
                )

            },
            bindEvents:function () {
                this.form.addEventListener('submit',(e) => {
                    e.preventDefault()
                    this.saveMessage()
                })
            },
            saveMessage:function () {
                let myForm = this.form
                let content = myForm.querySelector('input[name=content]').value
                let name = myForm.querySelector('input[name=name]').value
                this.model.save(name, content).then(function (object) {
                    let li = document.createElement('li')
                    li.innerText = `${object.attributes.name} : ${object.attributes.content}`
                    let messageList = document.querySelector('#messageList')
                    messageList.insertBefore(li,messageList.firstChild)
                    myForm.querySelector('input[name=content]').value=''
                    console.log(object)
                })
            }
        }

        controller.init(view, model)
}.call()