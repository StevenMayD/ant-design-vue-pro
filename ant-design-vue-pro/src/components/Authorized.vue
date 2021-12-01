<script>
/* 函数式组件里是没有this的，要怎样在template中使用check呢？ 
    且slot不能作为根元素标签，必须有父级标签，这样有会影响 HTML结构
  这样使用template就很不方便了， 所以这里不使用template，直接使用render 函数式组件写法
*/
import { check } from "../utils/auth";

export default {
  // 函数式组件写法
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true, // 要求外界必须传递 （注意不是 require）
    },
  },
  // 提供两个参数
  render(h, context) {
    // 从context中取出props和scopedSlots （会自动都挂载到scopedSlots上，不用区分是作用域插槽还是具名插槽）
    const { props, scopedSlots } = context;
    // 如果校验通过，则返回插槽(就是传递过来的子组件)，否则返回null (注意这里不是 defaults)
    return check(props.authority) ? scopedSlots.default() : null;
  },
};
</script>
