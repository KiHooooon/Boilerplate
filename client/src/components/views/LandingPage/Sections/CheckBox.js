import React, {useState} from 'react';
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

function CheckBox(props) {
    const [Checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        // 누른것의 Index를 구하고 
        // 전체 Check 된 State에서 현재 누른 Checkbox가 이미 있다면 State에서 빼주고         
        // 없다면 State에 넣어준다
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];
        if(currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        props.handleFilters(newChecked);
    }
    const renderCheckBoxList = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={()=> handleToggle(value._id)} checked={Checked.indexOf(value._id) === -1 ? false : true}/>
            <span>{value.name}</span>
        </React.Fragment>
    ))
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">
                    {renderCheckBoxList()}                    
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
