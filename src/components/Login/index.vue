<template>
  <div>
    <div class="container-header">
      <h3 id="text">这是一款商品后台管理的Vue3项目</h3>
      <p id="text1">基于Vue + Vite + Pinia</p>
    </div>
    <div class="container">
      <form action="#" class="login-form">
        <h2>登录</h2>
        <input
          type="text"
          id="username"
          autocomplete="username"
          v-model.trim="formLabelAlign.name"
          placeholder="用户名"
          required
        />
        <input
          type="password"
          id="password"
          autocomplete="current-password"
          v-model.trim="formLabelAlign.passwd"
          placeholder="密码"
          required
        />
        <button type="submit" @click="submitHandle">登录</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStateStores } from '@/stores/stateStores'
import { setTokenData } from '@/network/localStores'
import './utils/jquery.min.js'
import './utils/jquery.easing.1.3.js'
import './utils/core_plugin.js'

const formLabelAlign = reactive({
  name: '',
  passwd: ''
})

const useState = useStateStores()
const { login } = useState
const router = useRouter()

const submitHandle = () => {
  login(formLabelAlign.name, formLabelAlign.passwd)
    .then((token) => {
      ElMessage.success('登录成功')
      //   console.log(token)
      setTokenData(token)
      router.replace('/')
    })
    .catch((err) => {
      ElMessage.error('账号或者密码错误')
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          object[key] = ''
        }
      }
    })
}

onMounted(() => {
  ;(function ($) {
    'use strict'
    var isOn = 0,
      sets,
      $text,
      toAnimate = '#text',
      settings = {
        animation: 8, //动画方式 从1-15 每个数字代表一个动画 请自测效果
        animationType: 'in', //显示方式 in 和out 参数，in代表入场,out代表出场
        backwards: false, //改变动画显示方向，默认false 设为true 动画将从后往前倒序播放
        easing: 'easeOutQuint', //这里的效果 可以参见http://code.ciaoca.com/jquery/easing/
        speed: 1000, //动画帧速 即在指定时间内完成动画
        sequenceDelay: 100, //场景延迟  即执行完上一个动画后，等待指定时间继续执行下一动画
        startDelay: 0, //开始延迟，即执行当前动画时，等待指定时间后再开始
        offsetX: 100, //动画元素 x坐标偏移量
        offsetY: 50, //动画元素 Y坐标偏移量
        onComplete: doThis, //回调函数 即 执行完动画后，需要执行的回调方法
        restoreHTML: true //重置元素 即重复播放两次该动画 类似于此效果 默认true
      }

    // 在文档加载完成后执行动画方法
    $(document).ready(function () {
      $text = $('#text')
      $.cjTextFx(settings)
      $.cjTextFx.animate(toAnimate)
    })

    function doThis() {
      $text = $('#text1')
      var animateObj = '#text1'
      if (isOn === 13) {
        $text.html('--by nps努力')
        sets = {
          animation: 1,
          animationType: 'in',
          restoreHTML: false,
          onComplete: false
        }
      } else {
        isOn < 13 ? isOn++ : (isOn = 0)
        switch (isOn) {
          case 1:
            sets = {
              animation: 2,
              animationType: 'in',
              easing: 'easeInQuint',
              restoreHTML: false
            }
            break

          case 2:
            sets = { animation: 11, animationType: 'out', restoreHTML: false }
            break

          case 3:
            $text.html('商品灵活管理，方便高效')
            sets = { animation: 11, animationType: 'in', restoreHTML: false }
            break
          case 4:
            sets = { animation: 5, animationType: 'out', restoreHTML: false }
            break
          case 5:
            $text.html('多种流行库的使用如TailWindCSS Axios Element Plus')
            sets = { animation: 1 }
            break

          case 6:
            sets = { animation: 1, animationType: 'out', restoreHTML: false }
            break

          case 7:
            $text.html('这是一款小型但不寒酸的Vue3的项目')
            sets = { animation: 6, backwards: true }
            break

          case 8:
            sets = { animation: 4, animationType: 'out', backwards: true, restoreHTML: false }
            break

          case 9:
            $text.html('有它，可以帮助你快速搭建商品后台管理系统')
            sets = { animation: 2, easing: 'easeOutBounce' }
            break

          case 10:
            sets = {
              animation: 2,
              animationType: 'out',
              speed: 500,
              easing: 'easeInBack',
              restoreHTML: false
            }
            break

          case 11:
            $text.html('如果喜欢此项目，敬请下载吧')
            sets = { animation: 14, startDelay: 1000, easing: 'easeInBack', restoreHTML: false }
            break

          case 12:
            sets = {
              animation: 6,
              animationType: 'out',
              speed: 500,
              easing: 'easeInBack',
              restoreHTML: false
            }
            break

          default:
            isOn = 13 //在这设定返回从头开始
            break
        }
      }
      jQuery.cjTextFx.animate(animateObj, sets)
    }
  })(jQuery)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.container {
  margin: 0;
  font-family: 'PingFang SC', 'Microsoft Yahei', sans-serif;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3453&q=80.jfif')
    fixed no-repeat;
  background-size: cover;
}

.container-header {
  width: 100%;
  position: fixed;
  _position: absolute;
  height: 300px;
  text-align: center;
  margin-left: 0px;
  margin-top: 19vh;
}

.container-header h3 {
  overflow: hidden;
  margin-bottom: 20px;
  height: 40px;
}

.container-header h3 span {
  color: rgba(57, 88, 69);
  font-size: 31px;
  line-height: 40px;
}

.container-header #text1 {
  display: none;
  font-size: 16px;
  margin-top: 25px;
  height: 40px;
  position: relative;
  font-family: 'Microsoft Yahei';
}

.container-header #text1 span {
  color: rgba(57, 88, 69);
  overflow: hidden;
  font-size: 25px;
  line-height: 40px;
}

.login-form {
  width: 412px;
  height: 320px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  text-align: center;
  position: relative;
  z-index: 100;
  background: inherit;
  border-radius: 18px;
  overflow: hidden; /* 隐藏多余的模糊效果 */
}

.login-form::before {
  content: '';
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  position: absolute;
  top: -10px;
  left: -10px;
  overflow: hidden;
  background: inherit;
  box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.25);
  filter: blur(6px);
  z-index: -1;
}

.login-form h2 {
  font-size: 18px;
  font-weight: 400;
  color: #3d5245;
}

.login-form input,
.login-form button {
  margin: 6px 0;
  height: 36px;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 0 14px;
  color: #3d5245;
}

.login-form input::placeholder {
  color: #3d5245;
}

/* 补充，取消选中高亮蓝框 */
.login-form button:focus,
.login-form input:focus {
  outline: 0;
}

.login-form button {
  margin-top: 24px;
  background-color: rgba(57, 88, 69, 0.4);
  color: white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 0.4s;
}

.login-form button:hover {
  background-color: rgba(12, 80, 38, 0.67);
}

.login-form button:focus {
  outline: 0;
}

.login-form button::before,
.login-form button::after {
  content: '';
  display: block;
  width: 80px;
  height: 100%;
  background: rgba(179, 255, 210, 0.5);
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  transform: skewX(-15deg);
  filter: blur(30px);
  overflow: hidden;
  transform: translateX(-100px);
}

.login-form button::after {
  width: 40px;
  background: rgba(179, 255, 210, 0.3);
  left: 60px;
  opacity: 0;
  filter: blur(5px);
}

.login-form button:hover::before {
  transition: 1s;
  transform: translateX(320px);
  opacity: 0.7;
}

.login-form button:hover::after {
  transition: 1s;
  transform: translateX(320px);
  opacity: 1;
}
</style>
