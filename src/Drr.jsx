import React, { useState } from 'react'
import './drr.css'
// import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
export default function Drr() {
    const [renderData, setRenderData] = useState([])
    const [updateCol, setUpdatecol] = useState(false);
    const [action, setAction] = useState('')
    const [monthYear, setmonthYear] = useState('')
    const [numberDays, setnumberDays] = useState('')
    const [lastUpdated, setlastUpdated] = useState('')
    const [lastUpdatedTime, setlastUpdatedTime] = useState('')
    const [data, setData] = useState({
        id: "",
        startDate: "",
        endDate: "",
        dateExcluded: "",
        leadCount: "",
        expectedDRR: ""
    })
    //adding user data to data object
    const dataAddHandle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const updateHandle = () => {
        if (updateCol) {
            setUpdatecol(false)
        } else {
            setUpdatecol(true)
        }
    }
    let [count, setCount] = useState(0)
    //when using axios
    // const saveHandle = async() => {
    const saveHandle = async () => {
        //data checking
        if (data.id === "" && data.leadCount === "" && data.expectedDRR === "" && data.dateExcluded === "") {
            toast('Enter Remaining data')
        }
        else {
            const last = new Date().getFullYear() + "-" + (1 + new Date().getMonth()) + "-" + new Date().getDay();
            const lastTime = new Date().getHours() + "-" + new Date().getMinutes() + "-" + new Date().getSeconds()
            const star = new Date(data.startDate);
            const end = new Date(data.endDate);
            setmonthYear((1 + star.getMonth()))
            const dateArray = data.dateExcluded.split(',');
            const sv = data.startDate.split('-');
            const ev = data.endDate.split('-');
            const starValue = Number(sv[2])
            const endValue = Number(ev[2])
            if (endValue < starValue) {
                toast("Enter Correct Data");
            }
            else {
                //logic for cell data
                for (let i = 0; i < dateArray.length; i++) {
                    console.log(dateArray[i])
                    const dateCheck = new Date(dateArray[i]);
                    if (dateCheck.getFullYear() === star.getFullYear()) {
                        const checkM = 1 + dateCheck.getMonth();
                        const starM = 1 + star.getMonth();
                        const endM = 1 + end.getMonth();
                        if (checkM >= starM && checkM <= endM) {
                            const checkD = dateArray[i].split('-');
                            const checkValue = Number(checkD[2])
                            const starValue = Number(sv[2])
                            const endValue = Number(ev[2])
                            if (checkValue >= starValue && checkValue <= endValue) {
                                setCount(count + 1)
                            }
                        }
                    }
                }
                let days = endValue - 1 - count;
                setnumberDays(days)
                setCount(0)
                setlastUpdated(last)
                setlastUpdatedTime(lastTime)
                //adding data to the rendered data array
                setRenderData([...renderData, data])
                // axios for data submission to the backend if neded
                // // await axios.post("some url",{...data,numberDays,last})
                const dataOb = {
                    id: "",
                    startDate: "",
                    endDate: "",
                    dateExcluded: "",
                    leadCount: "",
                    expectedDRR: ""
                }
                setData(dataOb)
            }
        }

        setUpdatecol(false)
    }
    // to close the row
    const cancelHandle = () => {
        setRenderData([...renderData])
        setData({
            id: "",
            startDate: "",
            endDate: "",
            dateExcluded: "",
            leadCount: "",
            expectedDRR: ""
        })
        setUpdatecol(false)
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
                {updateCol ?
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
                        <div className="medium-box month"></div>
                        <div className="large-box dates">
                            <input type="text" name="dateExcluded" placeholder='Excluded dates' className="exclu" value={data.dateExcluded} onChange={dataAddHandle} />
                        </div>
                        <div className="large-box numberO"></div>
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
                        <div className="medium-box month line"><div>{monthYear}</div></div>
                        <div className="large-box dates line"><div>{val.dateExcluded}</div></div>
                        <div className="large-box numberO line"><div>{numberDays}</div></div>
                        <div className="small-box lead line"><div>{val.leadCount}</div></div>
                        <div className="large-box expected line"><div>{val.expectedDRR}</div></div>
                        <div className="esmall-box last"><div>
                            <div className="latest">
                                <div>{lastUpdated}</div>
                                <div>{lastUpdatedTime}</div>
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
