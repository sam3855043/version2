import {
  Typography,
  Popover,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Affix,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  message,
  Drawer,
  notification,
  Radio,
  Tag,
  Modal,
  Switch,
  Checkbox,
} from 'antd';
import React, { Component, Fragment  } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import CreateForm from './components/CreateForm';
import StandardTable from './components/StandardTable';
import UpdateForm from './components/UpdateForm';
import styles from './style.less';
import Media from 'react-media';

const FormItem = Form.Item;
const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

 
const OPTIONS = ['主日','禱告','家聚會', '小排', '晨興', '福音出訪','新人主日','受浸','召會生活','讀經','生命讀經追求'];
const MEETINGCHECK = ['lordsDay','homemeeting','gospel','smallgroup','praying','churchlife','morning','lifeStudying',
    'bible','newone','baptism',]
var MEETINGCHECKOPTIONS = [
      {
        name: '主日',
        label: 'lordsDay',
        id: 1
      },
      {
        name: '禱告',
        label: 'praying',
        id: 2
      },
      {
        name: '家聚會',
        label: 'homemeeting',
        id: 3
      },
      {
        name: '小排',
        label: 'smallgroup',
        id: 3
      },
      {
        name: '晨興',
        label: 'morning',
        id: 4
      },
      {
        name: '福音出訪',
        label: 'gospel',
        id: 5
      },
      {
        name: '新人主日',
        label: 'newone',
        id: 6
      }
    ];

/* eslint react/no-multi-comp:0 */
@connect(({ listTableList, loading }) => ({
  listTableList,
  loading: loading.models.rule,
}))
class TableList extends Component {

  state = {
    modalVisible: false,
    visible:false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    selectedItems: [],
    grouporder: false,
    orderopen:'true',
    orderrecorder:[],
    speedDialopen:false,
    direction: 'up',
    open: false,
    hidden: false,
    columnsprops:[],
    meetingposition:[],
    meetingrecord:[],
    drawerwith:500,
    zoom:'125%',
    affixheight:600,
    optionsrecord:[],
    namexheader:'left',
    districtxheader:'left',
    genderheader:'left',
    fixheadrecord:[],
  };

  columns = [
    {
      title: '姓名',
      width:100,
      dataIndex: 'name',
      //ellipsis: true,
      fixed:`${this.state.namexheader}`,
    },
    {
      title: '區別',
      ellipsis: true,
      width:100,
      dataIndex: 'district',
      fixed:`${this.state.districtxheader}`,
    },
    {
      title: '性別',
      ellipsis: true,
      width:100,
      dataIndex:'gender',
      fixed:`${this.state.genderheader}`,
    },
  
    {
      title: (<Popover content={ 
      <div>
      <p>滑鼠移至表格內</p> 
      <p>按住shift 滑動滾輪</p>
      </div>
       } title='表格移動'><Button type="link">主日</Button></Popover>),
      displaycheck:'主日',
      ellipsis: true,
      width:100,
      render: (text, record,title) => {
        if (record.lordsDay=='true') {
          return(
            <Fragment>
              <Button type='primary' onClick={() => this.buttonhandle(true, record, 'lordsDay')}>主日</Button>
            </Fragment>
            )
        }
        return(
          <Fragment>
            <Button type='dashed' onClick={() => this.buttonhandle(true, record ,'lordsDay')}>主日</Button>
          </Fragment>
        )
      }
    },
    {
      title: (<Button  type="link" > 禱告</Button>),
      width:100,    
      displaycheck:'禱告',
      render: (text, record,title) => {
        if (record.praying=='true') {
          return(
            <Fragment>
              <Button type='primary' onClick={() => this.buttonhandle(true, record, 'praying')}>禱告</Button>
            </Fragment>
            )
        }
        return(
          <Fragment>
            <Button type='dashed' onClick={() => this.buttonhandle(true, record ,'praying')}>禱告</Button>
          </Fragment>
        )
      }
    },
    {
      title : (<Button  type="link"> 家聚會</Button>),
      displaycheck:'家聚會',
      width:100,    
      render: (text, record,title) => {
        if (record.homemeeting=='true') {
          return(
            <Fragment>
              <Button type='primary' onClick={() => this.buttonhandle(true, record, 'homemeeting')}>家聚會</Button>
            </Fragment>
            )
        }
        return(
          <Fragment>
            <Button type='dashed' onClick={() => this.buttonhandle(true, record ,'homemeeting')}>家聚會</Button>
          </Fragment>
        )
      }
    },
    {
      title : (<Button  type="link"> 小排</Button>),
      displaycheck:'小排',
      width:100,    
      render: (text, record,title) => {
        if (record.smallgroup=='true') {
          return(
            <Fragment>
              <Button type='primary' onClick={() => this.buttonhandle(true, record, 'smallgroup')}>小排</Button>
            </Fragment>
            )
        }
        return(
          <Fragment>
            <Button type='dashed' onClick={() => this.buttonhandle(true, record ,'smallgroup')}>小排</Button>
          </Fragment>
        )
      }
    },
    
    {
      title: (<Button  type="link" > 晨 興</Button>),
      width:100,
      render: (text, record,title) => {

        if (record.morning=='true') {
          return(
            <Fragment>
              <Button type='primary' onClick={() => this.buttonhandle(true, record,'morning')}>晨興</Button>
            </Fragment>
            )
        }
        return(
          <Fragment>
            <Button type='dashed' onClick={() => this.buttonhandle(true, record, 'morning')}>晨興</Button>
          </Fragment>
        )
      }
    },
    {
      title: (<Button  type="link"> 福音出訪</Button>),
      width:100,
      render: (text, record,title) => {

        if (record.gospel=='true') {
          return(
            <Fragment>
              <Button type='primary' onClick={() => this.buttonhandle(true, record,'gospel')}>福音出訪</Button>
            </Fragment>
            )
        }
        return(
          <Fragment>
            <Button type='dashed' onClick={() => this.buttonhandle(true, record, 'gospel')}>福音出訪</Button>
          </Fragment>
        )
      }
    },

    {
      title: (<Button  type="link"> 新人主日</Button>),
      width:100,
      render: (text, record,title) => {
        //console.log('title',title)
        if (record.newone=='true') {
          return(
            <Fragment>
              <Button type='primary' onClick={() => this.buttonhandle(true, record,'newone')}>新人主日</Button>
            </Fragment>
            )
        }
        return(
          <Fragment>
            <Button type='dashed' onClick={() => this.buttonhandle(true, record, 'newone')}>新人主日</Button>
          </Fragment>
        )
      }
    },
    {

      title: (<Button  type="link"> 受浸</Button>), 
      width:100,
      render: (text, record,title) => {

        if (record.baptism=='true') {
          return(
            <Fragment>
              <Button type='primary' onClick={() => this.buttonhandle(true, record,'baptism')}>受浸</Button>
            </Fragment>
            )
        }
        return(
          <Fragment>
            <Button type='dashed' onClick={() => this.buttonhandle(true, record, 'baptism')}>受浸</Button>
          </Fragment>
        )
      }
    
    },
    {
      title: (<Button  type="link"> 召會生活</Button>), 
      width:100,
      render: (text, record,title) => {

        if (record.churchlife=='true') {
          return(
            <Fragment>
              <Button type='primary' onClick={() => this.buttonhandle(true, record,'churchlife')}>召會生活</Button>
            </Fragment>
            )
        }
        return(
          <Fragment>
            <Button type='dashed' onClick={() => this.buttonhandle(true, record, 'churchlife')}>召會生活</Button>
          </Fragment>
        )
      }
    },
    {
      title: (<Button  type="link"> 生命讀經追求</Button>),
      width:100,
      render: (text, record,title) => {
  
        if (record.lifeStudying=='true') {
          return(
            <Fragment>
              <Button type='primary' onClick={() => this.buttonhandle(true, record,'lifeStudying')}>生命讀經追求</Button>
            </Fragment>
            )
        }
        return(
          <Fragment>
            <Button type='dashed' onClick={() => this.buttonhandle(true, record, 'lifeStudying')}>生命讀經追求</Button>
          </Fragment>
        )
      }
    },
    {
      title: (<Button  type="link"> 讀經</Button>), 
      
      render: (text, record,title) => {
        //console.log('title',title)
        if (record.bible=='true') {
          return(
            <Fragment>
              <Button type='primary' onClick={() => this.buttonhandle(true, record,'bible')}>讀經</Button>
            </Fragment>
            )
        }
        return(
          <Fragment>
            <Button type='dashed' onClick={() => this.buttonhandle(true, record, 'bible')}>讀經</Button>
          </Fragment>
        )
      }
    },
  ];
  fixhead =(checkedValues)=>{
    console.log('checkedValues',checkedValues)
    console.log('columns',this.columns)
    const recordtmp = this.state.fixheadrecord
    if(checkedValues.target.checked==true){

      if(checkedValues.target.itemName==='姓名'){
        for(i=0;i<this.columns.length;i++){
          if(this.columns[i].title==='姓名'){
            findheader = i;
            console.log('findheader',findheader)
            this.columns.splice(0,0,this.columns[findheader])
            this.columns[0].fixed = 'left'
            this.columns.splice(findheader+1,1)
          }


      }
    }
      if(checkedValues.target.itemName==='區別'){ 
        for(i=0;i<this.columns.length;i++){
          if(this.columns[i].title==='區別'){
            findheader = i;
            console.log('findheader',findheader)
            this.columns.splice(1,0,this.columns[findheader])
            this.columns[1].fixed = 'left'
            this.columns.splice(findheader+1,1)
          }
      }
    }
      if(checkedValues.target.itemName==='性別'){
        for(i=0;i<this.columns.length;i++){
        if(this.columns[i].title==='性別'){
          findheader = i;
          console.log('findheader',findheader)
          this.columns.splice(2,0,this.columns[findheader])
          this.columns[2].fixed = 'left'
          this.columns.splice(findheader+1,1)
        }
      }
      }
    }else{
      if(checkedValues.target.itemName==='姓名'){
        recordtmp.push(checkedValues.target.itemName)
        var findheader=0;
        var i;
        for(i=0;i<this.columns.length;i++){
          if(this.columns[i].checkbox==='主日'){
            findheader = i;
          }
        };
          console.log(findheader)
          this.columns[0].fixed = false
          this.columns.splice(findheader,0,this.columns[0])
          this.columns.splice(0,1)          
      }
      if(checkedValues.target.itemName==='區別'){
        var findheader=0;
        var i;
        for(i=0;i<this.columns.length;i++){
          if(this.columns[i].checkbox==='主日'){
            if(this.columns[i-1].title==='姓名'){
              this.columns[0].fixed = false
              findheader = i;
              this.columns.splice(findheader,0,this.columns[0])
              this.columns.splice(0,1)  
            }else{
              this.columns[1].fixed = false
              findheader = i;
              this.columns.splice(findheader,0,this.columns[1])
              this.columns.splice(1,1)  
            }
          }
        };
          console.log(findheader)
      }
      if(checkedValues.target.itemName==='性別'){
        for(i=0;i<this.columns.length;i++){
          if(this.columns[i].checkbox==='主日'){
            if(this.columns[i-2].title==='姓名'){
              if(this.columns[i-1].title==='區別'){
                this.columns[0].fixed = false
                findheader = i;
                this.columns.splice(findheader,0,this.columns[0])
                this.columns.splice(0,1)  
              }else{                
                this.columns[1].fixed = false
                findheader = i;
                this.columns.splice(findheader,0,this.columns[1])
                this.columns.splice(0,1)  
              }

            }else{
              this.columns[2].fixed = false
              findheader = i;
              this.columns.splice(findheader,0,this.columns[2])
              this.columns.splice(2,1)  
            }
          }
        };
      }
    }
    console.log('checkedValues',checkedValues)
    console.log('columns',this.columns)
  }
  MeetingCheck = (checkedValues) => {
    const {meetingposition,meetingrecord,optionsrecord,selectedItems} = this.state;
    const tempcolumns = this.columns;
    const meetingrecord1 = meetingrecord
    const meetingposition1 = meetingposition
    const optionsrecord1 = optionsrecord
    console.log(selectedItems.indexOf(checkedValues.target.itemName))
    if(!(selectedItems.indexOf(checkedValues.target.itemName)==-1)){
      //
    }
    console.log('checkedValues.target',checkedValues.target)
    if(checkedValues.target.checked===false){ 
      
      delete selectedItems[selectedItems.indexOf(checkedValues.target.itemName)]
      meetingrecord1.push(parseInt(checkedValues.target.value,10)+2);
      meetingposition1.push(tempcolumns[parseInt(checkedValues.target.value,10)+2]);
      console.log('OPTIONS[parseInt(checkedValues.target.value,10)+1]',OPTIONS[parseInt(checkedValues.target.value,10)-1])
      optionsrecord1.push(OPTIONS[parseInt(checkedValues.target.value,10)-1]);
      delete this.columns[parseInt(checkedValues.target.value,10)+2];
      delete OPTIONS[parseInt(checkedValues.target.value,10)-1];

      //console.log(tempcolumns[parseInt(checkedValues.target.value,10)+2]);
      //console.log('meetingposition1',meetingposition1); 
      this.setState({
        meetingposition:meetingposition1,
        meetingrecord:meetingrecord1,
        optionsrecord:optionsrecord1,
      }, function(){
      //  console.log('checked = ', checkedValues);        
      //  console.log('this.state.meetingposition',this.state.meetingposition);
      //  console.log('this.state.meetingrecord',this.state.meetingrecord);
      //  console.log('this.state.optionsrecord',this.state.optionsrecord);
      //  console.log('this.columns',this.columns)
        console.log('OPTIONS',OPTIONS)
      })     
     }else{
        //this.columns = this.columns.splice(parseInt(checkedValues.target.value,10)+2,1,meetingposition[])
        const findposition = this.state.meetingrecord.indexOf(parseInt(checkedValues.target.value,10)+2)
        
        const findoption = this.state.optionsrecord.indexOf(checkedValues.target.itemName)
        console.log('this.state.meetingposition[findposition]',this.state.optionsrecord[findposition])
        OPTIONS.splice((parseInt(checkedValues.target.value,10)-1),1,this.state.optionsrecord[findoption])

        this.columns.splice((parseInt(checkedValues.target.value,10)+2),1,this.state.meetingposition[findposition])

        delete meetingrecord1[findposition]
        delete meetingposition1[findposition]
        delete optionsrecord1[findoption]
        this.setState({
          meetingposition:meetingposition1,
          meetingrecord:meetingrecord1,
          optionsrecord:optionsrecord1,

        }, function(){
          console.log('this.state.meetingposition',this.state.meetingposition);
          console.log('this.state.meetingrecord',this.state.meetingrecord);
          console.log('this.columns',this.columns)
          console.log('OPTIONS',OPTIONS)
          console.log('findposition',findposition)
        }) 

    }
    
  }

  //下拉連點選項
  handleSelectChange = selectedItems => {
    //
    this.setState({ selectedItems });

    this.setState(state=>{
      orderrecorder : []
    },function(){
      //console.log(this.state.orderrecorder);
    })
    this.setState({
      columnsprops : selectedItems,
    })
  };
  //
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  //
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  //按鈕點選事件
  buttonhandle = (states,recorde,meeting) => { 
    const {key} = recorde;
    this.setState({ isSave: false},function(){
      console.log(this.state.isSave);
    });
    const { dispatch,listTableList } = this.props;
    const list = listTableList.data.list
    const pagination = listTableList.data.pagination
    
    const index = list.findIndex(item => key === item.key);

    const item = list[index];
    
    const { selectedItems , grouporder, orderopen} = this.state;
    const ChosedOptions = OPTIONS.filter(o => selectedItems.includes(o));
    const{orderrecorder}=this.state;
    const orrr= orderrecorder.indexOf(key);
    if(grouporder==true){
      if(orderrecorder.indexOf(key)===-1){
        this.setState(state=>{
          orderrecorder : orderrecorder.push(key)
        },function(){
        console.log(this.state.orderrecorder);
        })
        ChosedOptions.map(item1 => {
          
          if(item1==='福音出訪'){
            list[index].gospel='true'
          }
          if(item1==='家聚會'){
            list[index].homemeeting='true'
          }
          if(item1==='召會生活'){
            list[index].churchlife='true'
          }
          if(item1==='小排'){
            list[index].smallgroup='true'
          }
          if(item1==='生命讀經追求'){
            list[index].lifeStudying='true'
          }
          if(item1==='晨興'){
            list[index].morning='true'
          }
          if(item1==='讀經'){
            list[index].bible='true'
          }
          if(item1==='主日'){
            list[index].lordsDay='true'
          }
          if(item1==='禱告'){
            list[index].praying='true'
          }
          if(item1==='新人主日'){
            list[index].newone='true'
          }
          if(item1==='受浸'){
            list[index].baptism='true'
          }

          })
      }
      else {
        const findperson = this.state.orderrecorder.indexOf(key)
        console.log('findperson',findperson)
        this.setState(state=>{
          orderrecorder : orderrecorder.splice(findperson,1)
        },function(){
        console.log(this.state.orderrecorder);
        })
        console.log('orderopen false')
        ChosedOptions.map(item1 => {
          console.log(item,'item')
          if(item1==='福音出訪'){
            list[index].gospel='false'
          }

          if(item1==='家聚會'){
            list[index].homemeeting='false'
          }
          if(item1==='小排'){
            list[index].smallgroup='false'
          }
          if(item1==='生命讀經追求'){
            list[index].lifeStudying='false'
          }
          if(item1==='召會生活'){
            list[index].churchlife='false'
          }
          if(item1==='晨興'){
            list[index].morning='false'
          }
          if(item1==='讀經'){
            list[index].bible='false'
          }
          if(item1==='主日'){
            list[index].lordsDay='false'
          }
          if(item1==='禱告'){
            list[index].praying='false'
          }
          if(item1==='新人主日'){
            list[index].newone='false'
          }
          if(item1==='受浸'){
            list[index].baptism='false'
          }

          })
      }
    }
    else {
      console.log('meeting',meeting)
      MEETINGCHECK.forEach(function(item2, index, array){
        console.log('item2',item2)
        if(meeting==item2){
          if(item[item2]==='true'){
            item[item2]='false'}
            else {item[item2]='true'
          }
        }
      })


    }
    
    dispatch({
      type: 'listTableList/fetchtable',
      payload: {list,pagination}
    });

  };
  // 開啟連點功能
  onChangetips = (flag) =>{
    console.log('onChangetips',flag)
    this.setState({
      grouporder:flag,

    }, function(){
      console.log('grouporder',this.state.grouporder);
    })
  };
  onChangetipsorder =(e)=>{
    console.log('onChangetipsorder',e)
    this.setState({
      orderopen:`${e.target.value}`,
    }, function(){
      console.log('orderopen',this.state.orderopen);
    })

  }
  

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listTableList/fetch',
    });
    if (window.matchMedia("(max-width: 500px)").matches) {
      console.log('window.matchMedia("(max-width: 500px)").matches',window.matchMedia("(max-width: 500px)").matches)
      console.log('window.innerHeight',window.innerHeight )
      this.setState({
          zoom:'100%',      
          drawerwith:window.innerWidth-100,
        }
      )
    } 
    this.setState({
      drawerwith:window.innerHeight-100,
      
    }
  )

      this.setState({
            affixheight:window.innerHeight-100,
        }
      )
     

  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'listTableList/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'listTableList/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'listTableList/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;

      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'listTableList/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listTableList/add',
      payload: {
        desc: fields.desc,
      },
    });
    message.success('添加成功');
    this.f();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listTableList/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    });
    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查詢
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset}
              >
                重置
              </Button>
              <a
                style={{
                  marginLeft: 8,
                }}
                onClick={this.toggleForm}
              >
                展開 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker
                  style={{
                    width: '100%',
                  }}
                  placeholder="请输入更新日期"
                />,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <div
          style={{
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              float: 'right',
              marginBottom: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              查詢
            </Button>
            <Button
              style={{
                marginLeft: 8,
              }}
              onClick={this.handleFormReset}
            >
              重置
            </Button>
            <a
              style={{
                marginLeft: 8,
              }}
              onClick={this.toggleForm}
            >
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      listTableList: { data },
      loading,
    } = this.props;
    
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const { selectedItems , grouporder } = this.state;
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    console.log('selectedItems',selectedItems);
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper>
          
        <Affix style={{ position: 'absolute', top: 100,left: 60,  }} offsetTop={this.state.affixheight}  onChange={affixed => console.log('affixed',affixed)}>
            <Popover content={
            <div>
                表格以及連點設定        
            </div>
            } title="設定">
            <Row> <button className={styles.affixbutton} onClick={this.showDrawer}><Icon type="menu" /></button></Row>
            </Popover>
        </Affix> 
 
        <Drawer
          title="設定"
          placement={this.state.placement}
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          width={this.state.drawerwith}
          //style={{width:'90%' }} 
        >
            <Divider>固定抬頭</Divider>
            <Row style={{ background: 'rgb(255, 255, 255)', padding: '10px 10px 10px', 'border-radius': '20px',}}>
                <Col span={8}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "1" itemName='姓名'  defaultChecked={true} onChange={this.fixhead}>姓名</Checkbox> </Col>
                <Col span={8}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "2" itemName='區別' defaultChecked={true} onChange={this.fixhead}>區別</Checkbox></Col>
                <Col span={8}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "3" itemName='性別' defaultChecked={true} onChange={this.fixhead}>性別</Checkbox></Col>
            </Row>
            <Divider>點名(選項)</Divider>
            <Row style={{ background: 'rgb(255, 255, 255)', padding: '10px 10px 10px', 'border-radius': '20px',}}>
                <Col span={8}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "1" itemName='主日' itemIndex ='lordsDay'defaultChecked={true} onChange={this.MeetingCheck}> 主日</Checkbox> </Col>
                <Col span={8}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "2" itemName='禱告' defaultChecked={true} onChange={this.MeetingCheck}>禱告</Checkbox></Col>
                <Col span={8}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "3" itemName='家聚會' defaultChecked={true} onChange={this.MeetingCheck}>家聚會</Checkbox></Col>
            </Row>
            <Row style={{ background: 'rgb(255, 255, 255)', padding: '10px 10px 10px' }}>
                <Col span={8}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "4" itemName='小排' defaultChecked={true} onChange={this.MeetingCheck}>小排</Checkbox> </Col>
                <Col span={8}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "5" itemName='晨興' defaultChecked={true} onChange={this.MeetingCheck}>晨興</Checkbox></Col>
                <Col span={8}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "6" itemName='福音出訪' defaultChecked={true} onChange={this.MeetingCheck}>福音出訪</Checkbox></Col>
            </Row>
            <Row style={{ background: 'rgb(255, 255, 255)', padding: '10px 10px 10px' }}>
                  <Col span={8}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "7" itemName='新人主日' defaultChecked={true} onChange={this.MeetingCheck}> 新人主日</Checkbox> </Col>
                  <Col span={8}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "8" itemName='受浸' defaultChecked={true} onChange={this.MeetingCheck}> 受浸</Checkbox> </Col>
                  <Col span={8}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "9" itemName='召會生活' defaultChecked={true} onChange={this.MeetingCheck}>召會生活</Checkbox> </Col>
            </Row>
            <Row style={{ background: 'rgb(255, 255, 255)', padding: '10px 10px 10px' }}>
                  <Col span={12}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "10" itemName='讀經' defaultChecked={true} onChange={this.MeetingCheck}>讀經</Checkbox> </Col>
                  <Col span={12}><Checkbox style={{ zoom:`${this.state.zoom}`}} value = "11" itemName='生命讀經追求' defaultChecked={true} onChange={this.MeetingCheck}>生命讀經追求</Checkbox> </Col>
            </Row>
            <Row >    
              <Divider>連點設定</Divider>
     
                <Tag className={styles.Tagorder} color="#87d068">開啟連點</Tag>
                <Switch size="large" onChange={this.onChangetips} />
            

            </Row>
            <Row>
            <Divider>連點選項(需要連點選項)</Divider>
            </Row>
            <Row align='middle' justify='center'>
                <Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={this.handleSelectChange}
                style={{ hight:'20', width: '100%' }}
                disabled={(!this.state.grouporder)}
             
                >
                {filteredOptions.map(item => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
                </Select> 
            </Row>
        </Drawer>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}

              //scroll={{  x: 'max-content' , y: 800}} 
              //scroll={{ y: 800, x: 1020 }}
            />
          </div>
        </Card>
    
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(TableList);

