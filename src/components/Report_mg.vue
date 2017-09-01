<template>
	<div>
		报表管理
		<Dropdown style="margin-left: 20px" @on-click="click(123)">
        <Button type="primary">
            下拉菜单
            <Icon type="arrow-down-b"></Icon>
        </Button>
        <Dropdown-menu slot="list" >
            <Dropdown-item >驴打滚</Dropdown-item>
            <Dropdown-item>炸酱面</Dropdown-item>
            <Dropdown-item disabled>豆汁儿</Dropdown-item>
            <Dropdown-item>冰糖葫芦</Dropdown-item>
            <Dropdown-item divided>北京烤鸭</Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
	</div>
</template>

<script>
  let id = 1000;

  export default {
    data() {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      click(t){
        alert(t);
      },
      append(store, data) {
        store.append({ id: id++, label: 'testtest', children: [] }, data);
      },
      remove(store, data) {
        store.remove(data);
      },
      renderContent(h, { node, data, store }) {
        /*return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.append(store, data) }>Append</el-button>
              <el-button size="mini" on-click={ () => this.remove(store, data) }>Delete</el-button>
            </span>
          </span>);*/

          return h(
          		'span',
      			[
      				h('span',
      					[h(
      						'span',
      						node.label
      					)]
      				),
      				h('span',
	      				{
	      					style:{
	      						float:"right",
	      						marginRight:"20px"
	      					}
	      				},
	      				[
	      					h(
	      						'el-button',
	      						{
	      							attrs:{
	      								size:"mini",
	      							},
	      							on:{
	      								click:() => this.append(store, data)
	      							}
	      						},
	      						['Append']
	      					),
	      					h(
	      						'el-button',
	      						{
	      							attrs:{
	      								size:"mini",
	      							},
	      							on:{
	      								click:() => this.remove(store, data)
	      							}
	      						},
	      						['Delete']
	      					)

	      				]

      				)
      			]
          	)
      }
    }
  };
</script>

<style>
	.test{
		font-size:.5em;
	}
</style>