import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { PROGRAMME_LIST_URL } from "../../utils/globalConfig";
import { IProgramme } from "../../types/programme.type";
import ProgrammeChartSection from "../../components/dashboard/page-access/programme-management/ProgrammeChartSection";
import ProgrammeCountSection from "../../components/dashboard/page-access/programme-management/ProgrammeCountSection";
import ProgrammeTypeAcCountSection from "../../components/dashboard/page-access/programme-management/ProgrammeTypeCountSection";
import { toast } from "react-hot-toast";
import Spinner from "../../components/general/Spinner";
import ProgrammeTableSection from "../../components/dashboard/page-access/programme-management/ProgrammeExpiryTableSection";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
import ProgrammePhaseChartSection from "../../components/dashboard/page-access/programme-management/ProgrammePhaseChartSection";

const ProgrammeManagementPage = () => {
  const [programme, setProgramme] = useState<IProgramme[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProgrammeList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IProgramme[]>(
        PROGRAMME_LIST_URL
      );
      const { data } = response;
      setProgramme(data);
      setLoading(false);
    } catch (error) {
      toast.error("An Error happened. Please contact admin");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProgrammeList();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pageTemplate2">
      <h1 className="text-2x1 font-bold">Programme Dashboard</h1>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <ProgrammeCountSection programmeList={programme} />
        </Grid>
        <Grid item xs={6} md={4}>
          <ProgrammeTypeAcCountSection programmeList={programme} />
        </Grid>
        <Grid item xs={6} md={4}>
          <ProgrammeTableSection programmeList={programme} />
          <ProgrammePhaseChartSection programmeList={programme}  />
        </Grid>
        <Grid item xs={6} md={8}>
          <ProgrammeChartSection programmeList={programme} />
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default ProgrammeManagementPage;
