import { Box, Skeleton, Stack } from "@mui/material";

const SkeletonCard = () => {
  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        height: "100%",
        maxWidth: "350px",
        borderRadius: "5px",
        boxShadow: "0 0 3px 1px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        padding: 3,
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "all .4s ease-in-out",
        position: "relative",
      }}
    >
      <Stack flexDirection="column" spacing={1}>
        <Box
          sx={{
            minHeight: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton variant="rounded" width="100%" height={200} />
        </Box>

        <Stack flexDirection="column" sx={{ height: 180 }} spacing={1}>
          <Skeleton variant="rounded" width="45%" height={30} />

          <Skeleton variant="rounded" width="100%" height={60} />

          <Skeleton variant="rounded" width="60%" height={30} />

          <Skeleton variant="rounded" width="85%" height={30} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SkeletonCard;
