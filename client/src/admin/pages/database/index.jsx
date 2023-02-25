import React from "react";
import { Box, Grid, styled, Typography } from "@mui/material";

const Styled = styled(Box)(() => ({
  flex: 4,
}));

const DBStructure = styled(Box)(() => ({}));

const DBOptions = styled(Box)(() => ({}));

const Database = () => {
  return (
    <Styled>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <DBStructure>
            <Typography>Database structure</Typography>
          </DBStructure>
        </Grid>
        <Grid item xs={9}>
          <DBOptions>sfsfs</DBOptions>
        </Grid>
      </Grid>
    </Styled>
  );
};

export default Database;
