import React, { useState } from 'react'
import './drr.css'
//importing toastify container for message chowing
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//our main function 
export default function Drr() {
    let [renderData, setRenderData] = useState([])
    let [showRow, setShowRow] = useState(false);
    const [count, setCount] = useState(0)
    let [data, setData] = useState({
        id: "",
        days: "No Data Yet",
        monthY: "No Data Yet",
        startDate: "",
        endDate: "",
        dateExcluded: "",
        leadCount: "",
        expectedDRR: "",
        lastUpdatedTime: ""
    })
    //adding user data to data object
    const dataAddHandle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        if (e.target.name === "endDate") {
            //setting month value
            console.log(data)
            setData({
                ...data,
                [e.target.name]: e.target.value,
                monthY: data.startDate.substring(5, 7)
            })
        }
        if (e.target.name === "leadCount" && data.dateExcluded != "") {
            console.log("data:" + data)
            let startVal = new Date(data.startDate);
            let endVal = new Date(data.endDate)
            let dateArray = data.dateExcluded.split(',');
            console.log("dateArray:" + dateArray)
            console.log("srtartvalue,endvalue:" + startVal, endVal)
            if (startVal.getMonth() <= endVal.getMonth()) {
                data.monthY = startVal.getMonth() + 1
                console.log(data.monthY)
                const mapVal = new Map()
                for (let i = 0; i < dateArray.length; i++) {
                    const value = dateArray[i]
                    const dateCheck = new Date(value)
                    if (value.substring(5, 7) == (dateCheck.getMonth() + 1)) {
                        if (mapVal.get(dateArray[i]) === 1) {
                            mapVal.set(dateArray[i], 1)
                        } else {
                            mapVal.set(dateArray[i], 1)
                            let individualArrayDate = dateArray[i]
                            console.log("individualArrayDate:" + individualArrayDate)
                            let individualArrayDateDay = individualArrayDate.substring(8, 10)
                            console.log("individualArrayDateDay:" + individualArrayDateDay)
                            let startDateDay = data.startDate.substring(8, 10)
                            console.log("startDateDay:" + startDateDay)
                            let endDateDay = data.endDate.substring(8, 10)
                            console.log("endDateDay:" + endDateDay)
                            if (individualArrayDateDay >= startDateDay && individualArrayDateDay <= endDateDay) {
                                console.log("validation success")
                                //setting days value
                                let startNumDayVal = Number(startDateDay);
                                let endNumDayVal = Number(endDateDay)
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                    days: endNumDayVal - (startNumDayVal - 1) - i - 1
                                })
                                console.log("data.days value:" + data.days)
                            }
                        }
                    } else {
                        toast("Date is error")
                    }
                }
                //reinitializing map to original value
                mapVal.clear()
            }
            console.log("data.days fhjkdfghdgjh" + data.days)
        }
    }
    const updateHandle = () => {
        if (showRow) {
            setShowRow(false)
        } else {
            setShowRow(true)
        }
    }
    const saveHandle = () => {
        if (data.days) {
            setRenderData([...renderData, data])
        } else {
            toast("days value is empty")
        }
        setShowRow(false)
        setData({
            id: "",
            days: "",
            monthY: "",
            startDate: "",
            endDate: "",
            dateExcluded: "",
            leadCount: "",
            expectedDRR: "",
            lastUpdatedTime: ""
        })
        console.log(data)
    }
    const cancelHandle = () => {
        setShowRow(false)
    }
    return (
        <div className="drr">
            {/* add button */}
            <div className="add" onClick={updateHandle}>Add New</div>
            {/* heading of the table */}
            <div className="table-layout">
                <div className="tableHead">
                    <div className="small-box action line">Action</div>
                    <div className="small-box id line" >ID</div>
                    <div className="small-box start line">Start Date</div>
                    <div className="small-box end line">End Date</div>
                    <div className="medium-box month line">Month,Year</div>
                    <div className="large-box dates line">Dates Excluded</div>
                    <div className="large-box numberO line">Number of Days</div>
                    <div className="small-box lead line">Lead Count</div>
                    <div className="large-box expected line">Expected DRR</div>
                    <div className="esmall-box last line">Last Updated</div>
                </div>
                {/* to open or to close the updated row */}
                {showRow ?
                    <div className="small-row newTableRow">
                        <div className="small-box action">N/A</div>
                        <div className="small-box id" >
                            <input type="text" name="id" placeholder='id value' value={data.id} onChange={dataAddHandle} />
                        </div>
                        <div className="small-box start">
                            <input type="date" name="startDate" placeholder='start date' value={data.startDate} onChange={dataAddHandle} />
                        </div>
                        <div className="small-box end">
                            <input type="date" name="endDate" placeholder='end date' value={data.endDate} onChange={dataAddHandle} />
                        </div>
                        <div className="medium-box month">{data.monthY}</div>
                        <div className="large-box dates">
                            <input type="text" name="dateExcluded" placeholder='Excluded dates' className="exclu" value={data.dateExcluded} onChange={dataAddHandle} />
                        </div>
                        <div className="large-box numberO">{data.days}</div>
                        <div className="small-box lead">
                            <input type="text" name="leadCount" placeholder='lead count' value={data.leadCount} onChange={dataAddHandle} />
                        </div>
                        <div className="large-box expected">
                            <input type="text" name="expectedDRR" placeholder='DDR' className="eddr" value={data.expectedDRR} onChange={dataAddHandle} />
                        </div>
                        <div className="esmall-box last update">
                            <div className="save" onClick={saveHandle}>Save</div>
                            <div className="cancel" onClick={cancelHandle}>Cancel</div>
                        </div>
                    </div> : <div></div>
                }
                {/* rendering rows data in web */}
                {renderData?.map((val) => {
                    return (<div className="newtable">
                        <div className="small-box action line" ><div>N/A</div></div>
                        <div className="small-box id line" ><div>{val.id}</div></div>
                        <div className="small-box start line"><div>{val.startDate}</div></div>
                        <div className="small-box end line"><div>{val.endDate}</div></div>
                        <div className="medium-box month line"><div>{val.monthY}</div></div>
                        <div className="large-box dates line"><div>{val.dateExcluded}</div></div>
                        <div className="large-box numberO line"><div>{val.days}</div></div>
                        <div className="small-box lead line"><div>{val.leadCount}</div></div>
                        <div className="large-box expected line"><div>{val.expectedDRR}</div></div>
                        <div className="esmall-box last"><div>
                            <div className="latest">
                                <div>{val.lastUpdatedTime}</div>
                                <div>updated time</div>
                            </div>
                        </div></div>
                    </div>)
                })}
            </div>
            {/* tost container */}
            <ToastContainer />
        </div>
    )
}