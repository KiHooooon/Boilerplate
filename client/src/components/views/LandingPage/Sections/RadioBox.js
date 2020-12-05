import React, {useState} from 'react'
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;

function RadioBox(props) {
    
    const [Value, setValue] = useState(0);

    const renderRaidoBoxList = () => {
        return (
            props.list && props.list.map(item => (
                <Radio key={item._id} value={item._id}>{item.name}</Radio>
            ))
        )
    }
    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value);
    }

    return (
        <div>
            <Collapse defaultActiveKey={['2']}>
                <Panel header="This is panel header 2" key="2">
                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRaidoBoxList()}                    
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox