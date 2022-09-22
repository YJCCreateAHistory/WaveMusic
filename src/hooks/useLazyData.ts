
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
 
/**
 * 功能: 数据懒加载
 *
 * @param {*} fn  当目标可见时，要调用一次的函数
 * @returns target: 要观察的目标（vue3的引用）
 */
export const useLazyData = (fn, target) => {
  // const target = ref(null)
  const { stop } = useIntersectionObserver(
    target, // target 是vue的对象引用。是观察的目标
    // isIntersecting 是否进入可视区域，true是进入 false是移出
    // observerElement 被观察的dom
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) { // 目标可见，
        // // 1. ajax可以发了，后续不需要观察了
        // // 2. 执行函数
        fn()
      }
    }, {
      //threshold 进入可视区的占比 ,取 0-1 之间,默认是0.1，
      threshold: 0
     }
  )
 
  return target
}

