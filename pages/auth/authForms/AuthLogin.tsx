import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { loginType } from "../../../src/types/auth/auth";
import CustomCheckbox from "../../../src/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "../../../src/components/forms/theme-elements/CustomFormLabel";
import { useAuth  } from "../../../src/components/shared/AuthProvider"; // AuthProvider 가져오기
import AuthSocialButtons from "./AuthSocialButtons";
import { useRouter } from 'next/router'; // next/router에서 useRouter 가져오기

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { login } = useAuth();
  const router = useRouter(); // useRouter 사용

  const handleLogin = () => {
    // 로그인 처리 로직...
    // 로그인이 성공했을 경우
    login(); // AuthProvider의 login 함수 호출하여 로그인 상태 변경
    //로그인 처리후에 원래 가야할곳으로 이동시
    const redirect = router.query.redirect || '/';
    const redirectUrl = Array.isArray(redirect) ? redirect[0] : redirect; // 배열인 경우 첫 번째 요소 선택
    router.push(redirectUrl);
  };

  return (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <AuthSocialButtons title="Sign in with" />
    <Box mt={3}>
      <Divider>
        <Typography
          component="span"
          color="textSecondary"
          variant="h6"
          fontWeight="400"
          position="relative"
          px={2}
        >
          or sign in with
        </Typography>
      </Divider>
    </Box>

    <Stack>
      <Box>
        <CustomFormLabel htmlFor="username">사원번호</CustomFormLabel>
        <CustomTextField id="username" variant="outlined" fullWidth />
      </Box>
      <Box>
        <CustomFormLabel htmlFor="password">비밀번호</CustomFormLabel>
        <CustomTextField
          id="password"
          type="password"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormControlLabel
            control={<CustomCheckbox defaultChecked />}
            label="이 장치 기억"
          />
        </FormGroup>
        <Typography
          component={Link}
          href="/auth/forgot-password"
          fontWeight="500"
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          비밀번호를 잊으셨나요?
        </Typography>
      </Stack>
    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        // component={Link}
        // href="/"
        type="submit"
        onClick={handleLogin} // 로그인 버튼 클릭 시 handleLogin 함수 호출
      >
        로그인
      </Button>
    </Box>
    {subtitle}
  </>
  );
};

export default AuthLogin;
