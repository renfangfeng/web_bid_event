$(function() {
initArtCateList()
// 获取文章分类的列表
function initArtCateList() {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function(res) {
      const htmlStr = template('tpl-table', res)
      $('tbody').html(htmlStr)
    }
  })
}

//利用layui自带的方法
const layer = layui.layer
//给添加按钮绑定点击事件
let indexAdd = null
$('#btnAddCate').on('click',function() {
    //layui方法
    indexAdd = layer.open({
        type:1,
        area:['500px','250px'],
        title:'添加文章分类',
        content:$('#dialog-add').html()
    })
})


$('body').on('submit','#form-add',function(e) {
    // e.preventDefault()
    $.ajax({
        type:'post',
        url:'/my/article/addcates',
        data:$(this).serialize(),
        succee:function(res) {
            if(res.status !== 0){
                return layer.msg('添加失败')
            }
            //重新获取
            initArtCateList();
            layer.msg('添加成功')
            //根据索引关闭弹出层
            // layer.close(indexAdd)
        }
       
    })
})

//通过事件委托

$('tbody').on('click','.btn-edit',function() {
    indexAdd = layer.open({
        type:1,
        area:['500px','250px'],
        title:'修改文章分类',
        content:$('#dialog-edit').html()
    })
})









})