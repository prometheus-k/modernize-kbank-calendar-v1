import { Avatar, Box, Typography, Grid, Stack } from '@mui/material';
import { useAuth  } from "../../../../components/shared/AuthProvider"; // AuthProvider 가져오기
import * as dropdownData from './data';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';


const AppLinks = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const handleLinkClick = (href: string) => {
    if (!isLoggedIn) {      
      router.push(`/auth/auth2/login?redirect=${encodeURIComponent(href)}`);
    } else {
    // 로그인 상태에서 링크 클릭에 대한 처리
    router.push(href); // 링크로 이동
    console.log('Link clicked in logged-in state');
    }
  };
  return (
    <Grid container spacing={3} mb={4}>
      {dropdownData.appsLink.map((links, index) => (
        <Grid item lg={6} key={index}>
          <Link href={isLoggedIn ? links.href : '/auth/auth2/login'}  className="hover-text-primary" >
            <Stack direction="row" spacing={2} 
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault(); // 링크 클릭의 기본 동작을 중지
                    handleLinkClick(links.href); // 로그인 페이지로 이동 처리
                  }
                }}
            >
              <Box
                minWidth="45px"
                height="45px"
                bgcolor="grey.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  src={links.avatar}
                  alt={links.avatar}
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: 0,
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="textPrimary"
                  noWrap
                  className="text-hover"
                  sx={{
                    width: '240px',
                  }}
                >
                  {links.title}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontSize="12px"
                  sx={{
                    width: '240px',
                  }}
                  noWrap
                >
                  {links.subtext}
                </Typography>
              </Box>
            </Stack>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default AppLinks;
