import { IProgramme, PhaseReAccreditation } from "../../../../types/programme.type";
import React from "react";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface IProps {
    programmeList: IProgramme[];
}

const ProgrammePhaseChartSection = ({ programmeList }: IProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const ChartValues1 = [];
    const ChartValues2 = [];
    const ChartValues3= [];
    const ChartValues4 = [];
    const ChartValues5 = [];
    const ChartValues6 = [];

    const phase1Count = programmeList.filter((q)=>
        q.phaseReAccreditation.includes(PhaseReAccreditation["Phase 1"])
    ).length;
    ChartValues1.push(phase1Count);

    const phase2Count = programmeList.filter((q)=>
        q.phaseReAccreditation.includes(PhaseReAccreditation["Phase 2"])
    ).length;
    ChartValues2.push(phase2Count);

    const phase3Count = programmeList.filter((q)=>
        q.phaseReAccreditation.includes(PhaseReAccreditation["Phase 3"])
    ).length;
    ChartValues3.push(phase3Count);

    const phase4Count = programmeList.filter((q)=>
        q.phaseReAccreditation.includes(PhaseReAccreditation["Phase 4"])
    ).length;
    ChartValues4.push(phase4Count);

    const phase5Count = programmeList.filter((q)=>
        q.phaseReAccreditation.includes(PhaseReAccreditation["Phase 5"])
    ).length;
    ChartValues5.push(phase5Count);

    const phase6Count = programmeList.filter((q)=>
        q.phaseReAccreditation.includes(PhaseReAccreditation["Phase 6"])
    ).length;
    ChartValues6.push(phase6Count);

    const chartData = [
        ["Phase of ReAccreditation","Number of phase"],
        ["Phase 1", phase1Count],
        ["Phase 2", phase2Count],
        ["Phase 3", phase3Count],
        ["Phase 4", phase4Count],
        ["Phase 5", phase5Count],
        ["Phase 6", phase6Count],
    ]

    const options = {
        title:"Programmes Phase ReAccreditation Chart",
        is3D:true,
    }

    const getValues = async()=>{
        try{
            setLoading(true);
            setLoading(false);
        }catch(error){
            toast.error("An error occured. Please contact admin");
            setLoading(false);
        }
    };

    useEffect(() => {
        getValues(); //get data from backend
      }, []);

    return (
        <div className="col-span-1 lg:col-span-3 bg-white p-2 rounded-md">
            <Chart
                chartType="PieChart"
                data={chartData}
                options={options}
                width={"100%"}
                height={"400px"}
                />
        </div>
    );
};

export default ProgrammePhaseChartSection;

