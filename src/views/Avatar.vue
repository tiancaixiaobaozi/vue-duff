<template>
  <div class="avatar">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改头像</span>
      </div>
      <div class="card-body">
        <div class="left">
          <!-- 图片上传input -->
          <input
            type="file"
            accept="image/*"
            id="imgReader"
            ref="input-file"
            class="input-file"
            @change="imageChange"
          >
          <!-- 一个用于给Cropper.js覆盖使用的img  -->
          <img v-show="isCrop" ref="cropImg" class="crop-img">
          <!-- 操作 -->
          <img v-show="!isCrop" class="header-img" @click="chooseImage" :src="avatar" />
        </div>
        <!-- 两个用于预览的div  -->
        <div v-show="isCrop" class="preview-box">
          <p class="previewText">裁剪预览</p>
          <div ref="previewBox" class="previewBox"></div>
          <div ref="previewBoxRound" class="previewBoxRound"></div>
        </div>
      </div>
      <div v-show="isCrop" class="card-footer">
        <el-button class="el-button" type="success" @click="submit">确认裁剪</el-button>
        <el-button class="el-button" type="primary" @click="changeImg('rotate')">旋转</el-button>
        <el-button class="el-button" type="primary" @click="changeImg('reset')">复原</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs' // https://github.com/fengyuanchen/cropperjs#cropperjs

let CROPPER // 创建一个cropper的全局对象
export default {
  name: 'Avatar',
  data () {
    return {
      isCrop: false,
      avatar: require('@/assets/logo.png')
    }
  },
  methods: {
    // 处理图片
    imageChange (event) {
      console.log(event)
      // 读取上传文件
      let reader = new FileReader()
      if (event.target.files[0]) {
        this.isCrop = !this.isCrop
        // readAsDataURL方法可以将File对象转化为data:URL格式的字符串（base64编码）
        reader.readAsDataURL(event.target.files[0])
        reader.onload = e => {
          // 将img的src改为刚上传的文件的转换格式
          let imageDOM = document.querySelector('.crop-img')
          imageDOM.src = reader.result
          // 创建cropper实例
          CROPPER = new Cropper(document.querySelector('.crop-img'), {
            aspectRatio: 4 / 4, // 裁剪框比利
            viewMode: 1,
            minContainerWidth: 300, // 容器大小
            minContainerHeight: 300,
            dragMode: 'move', // 设置裁剪框为可以移动
            preview: [
              // this.$refs['previewBox'],
              // this.$refs['previewBoxRound']
              document.querySelector('.previewBox'),
              document.querySelector('.previewBoxRound')
            ]
          })
        }
      }
    },
    // 确认裁剪
    submit () {
      if (CROPPER) {
        // getCroppedCanvas方法可以将裁剪区域的数据转换成canvas数据
        const cropImg = CROPPER.getCroppedCanvas({
          maxWidth: 4096,
          maxHeight: 4096,
          fillColor: '#fff',
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high'
        })
        if (cropImg) {
          this.avatar = cropImg.toDataURL()
          cropImg.toBlob((blob) => {
            // 然后调用浏览器原生的toBlob方法将canvas数据转换成blob数据
            // 之后就可以愉快的将blob数据发送至后端啦，可根据自己情况进行发送
            const formData = new FormData()
            // 第三个参数为文件名，可选填
            formData.append('croppedImage', blob, 'avatar.png')
            // TODO 发送后端
            if (CROPPER) {
              this.isCrop = !this.isCrop
              CROPPER.destroy()
              // CROPPER.zoom(0.1) // 缩放图片，单位为数字，0.1为在原缩放基础上增加0.1倍
              // CROPPER.reset() // 重置对图片的所有操作
            }
          })
        }
      } else {
        this.$message.error('未获取到有效图像')
      }
    },
    // 旋转
    changeImg (type) {
      if (CROPPER) {
        switch (type) {
          case 'rotate':
            CROPPER.rotate(90)
            break
          case 'reset':
            CROPPER.reset()
            break
          default:
            break
        }
      }
    },
    // 选择图片
    chooseImage () {
      this.$refs['input-file'].click()
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-file{
    display: none;
  }
  .box-card {
    width: 750px;
    margin: 0 auto;
  }
  .card-body {
    display: flex;
    .left {
      flex: 1;
    }
    .preview-box {
      width: 150px;
      div {
        margin: 20px auto;
      }
    }
  }
  .card-footer {
    padding-top: 20px;
  }
  .header-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0 0 5px #adadad;
    cursor: pointer;
  }

  .crop-img{
    height: 100px;
    width: 100px;
    box-shadow: 0 0 5px #adadad;
  }
  .previewBox, .previewBoxRound{
    box-shadow: 0 0 5px #adadad;
    width: 100px;
    height: 100px;
    margin-top: 30px;
    overflow: hidden; /*这个超出设置为隐藏很重要，否则就会整个显示出来了*/
  }
  .previewBoxRound{
    border-radius: 50%; /*设置为圆形*/
  }
</style>
