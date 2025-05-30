import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DoughnutChart from './components/DoughnutChart'
import PieChart from './components/PieChart'
import ScatterChart from './components/ScatterChart'
import StackBarChart from './components/StackBarChart'
import Datepicker from "react-tailwindcss-datepicker"; 
import { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/adminHeader/headerSlice'




const Analytics = () => {

      const dispatch = useDispatch();

      useEffect(() => {
        dispatch(setPageTitle({ title: "Analytics" }));
      })
     

    const [dateValue, setDateValue] = useState({ 
        startDate: new Date(), 
        endDate: new Date() 
    }); 
    
    const handleDatePickerValueChange = (newValue) => {
        console.log("newValue:", newValue); 
        setDateValue(newValue); 
    } 

    return(
        <>
        <Datepicker 
                containerClassName="w-72" 
                value={dateValue} 
                theme={"light"}
                inputClassName="input input-bordered w-72" 
                popoverDirection={"down"}
                toggleClassName="invisible"
                onChange={handleDatePickerValueChange} 
                showShortcuts={true} 
                primaryColor={"white"} 
            /> 
        {/** ---------------------- Different (Analytics) ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-0 grid-cols-1 gap-6">
                <StackBarChart />
                <BarChart />
            </div>

        
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <DoughnutChart />
                <PieChart />
            </div>

            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <ScatterChart />
                <LineChart />
            </div>
        </>
    )
}

export default AdminLayout() (Analytics)