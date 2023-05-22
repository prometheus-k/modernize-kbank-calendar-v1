import { styled, Container, Box, useTheme } from "@mui/material";
import { useSelector } from "../../store/Store";
import { AppState } from "../../store/Store";


const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}

// const FullLayout: FC = ({children}) => {
const FullLayout: React.FC<Props> = ({ children }) => {

  return (
    <MainWrapper>
      
    </MainWrapper>
  );
};

export default FullLayout;
