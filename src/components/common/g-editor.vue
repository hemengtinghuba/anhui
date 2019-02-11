<template>
    <div>
         <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
    import Editor from 'wangeditor'
    export default {
        props: ["value"],
        data () {
            return {
                size: 1,
                editor: {},
                flag: true
            }
        },
        mounted() {
            this.editor = new Editor(this.$refs.editor);
            this.editor.customConfig.uploadImgServer = "https://img.others.ren/api/1/upload/?username=lock&key=ee515693b30cc650892e45d5b6571e5c";
            this.editor.customConfig.uploadFileName = "file";
            this.editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'image',  // 插入图片
                'table',  // 表格
                'video',  // 插入视频
                'undo',  // 撤销
                'redo'  // 重复
            ]
            this.editor.customConfig.customAlert =  (info) => {
                this.$message.error(info);
            }
            this.editor.customConfig.uploadImgHooks = {
                before:  (xhr, editor, files) => {
                    const file = files[0];
                    // 图片上传之前触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                    
                    // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                    const isLtnM = file.size > 1024 * 1024 * this.size;
                    const isJpg = file.type === 'image/jpeg';
                    const isPng = file.type === 'image/png';
                    const isGif = file.type === 'image/gif';
                    //console.log(file.size, file.type, isPng)
                    if(isLtnM) {
                        return {
                            prevent: true,
                            msg: `图片大小超过限制为${this.size}M`
                        }
                    } else if(!isJpg && !isPng && !isGif) {
                        return {
                            prevent: true,
                            msg: '图片格式不正确'
                        }
                    }


                },
                success:  (xhr, editor, result) => {
                    // 图片上传并返回结果，图片插入成功之后触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                },
                fail:  (xhr, editor, result) => {
                    // 图片上传并返回结果，但图片插入错误时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                },
                error:  (xhr, editor) => {
                    this.$message.error("上传信息出错！！");
                },
                timeout:  (xhr, editor) => {
                    // 图片上传超时时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },

                // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                customInsert:  (insertImg, result, editor) => {
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                   // console.log(result.image.display_url)
                    var url = result.image.display_url;
                    insertImg(url)

                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            }


            this.editor.customConfig.onchange = (html) => {
                this.$emit("input", html)
            }
            this.editor.create();
            console.log("test", this.value)
            this.editor.txt.html(this.value);
        },
        watch: {
            value() {
                if (this.flag) {
                    this.editor.txt.html(this.value);
                    this.flag = false;
                }

            }
        }
    }
</script>
<style>
    .w-e-text-container,.w-e-toolbar {
        z-index: 99!important;
    }
    .w-e-menu {
        z-index: 120!important;
    }
    .w-e-droplist {
        z-index: 99999!important;
    }

</style>
<style lang='scss' >
    .w-e-text {
        overflow: auto!important;
    }
</style>