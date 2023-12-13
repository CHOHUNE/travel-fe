import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const RecentViewed = () => {
  const [recentViewed, setRecentViewed] = useState([]);
  const navigate = useNavigate();
  const handleNavigateToProduct = (item) => {
    // 'type' 속성이 있는 경우 운송 상품으로 간주
    if (item.type === "transport") {
      navigate(`/transport/${item.tid}`);
    } else {
      // 'type' 속성이 없는 경우 호텔 상품으로 간주
      navigate(`/hotel/reserv/${item.hid}`);
    }
  };

  useEffect(() => {
    const loadedRecentViewed =
      JSON.parse(localStorage.getItem("recentViewed")) || [];
    setRecentViewed(loadedRecentViewed);
  }, []);

  return (
    <Box>
      <Heading size="md" mb={3}>
        최근 본 상품
      </Heading>
      {recentViewed.map((item, index) => (
        <Flex
          key={index}
          align="center"
          cursor="pointer"
          onClick={() => handleNavigateToProduct(item)}
        >
          <Image
            src={item.mainImgUrl || "default-image-url"}
            alt={item.name}
            boxSize="50px"
          />
          <Box ml="3">
            <Text fontWeight="bold">{item.description || item.transTitle}</Text>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};
