import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const RecentViewed = () => {
  const [recentViewed, setRecentViewed] = useState([]);
  const navigate = useNavigate();

  const handleNavigateToProduct = (e, item) => {
    e.stopPropagation(); // 부모타입으로 이벤트를 안넘기는것
    // 'type' 속성이 있는 경우 운송 상품으로 간주
    if (item.type === "transport") {
      navigate(`/transport/${item.tid}`);
    } else if (item.hid) {
      // 'type' 속성이 없는 경우 호텔 상품으로 간주
      navigate(`/hotel/reserv/${item.hid}`);
    }
  };

  useEffect(() => {
    const loadedRecentViewed =
      JSON.parse(localStorage.getItem("recentViewed")) || [];
    setRecentViewed(loadedRecentViewed);
  }, []);

  const truncateText = (str, num) => {
    if (str && str.length > num) {
      return str.slice(0, num) + "...";
    }
    return str;
  };

  return (
    <Box fontSize={"10px"}>
      <Heading size="md" mb={3}>
        최근 본 상품
      </Heading>
      {recentViewed.map((item, index) => (
        <Flex
          key={index}
          align="center"
          cursor="pointer"
          onClick={(e) => handleNavigateToProduct(e, item)}
          borderBottom={"1px solid gray"}
        >
          <VStack>
            <Image
              src={item.mainImgUrl || "이미지 없음"}
              alt={item.name}
              boxSize="50px"
              mb={1}
              mt={1}
            />
            <Box ml="3">
              <Text fontWeight="bold" noOfLines={1}>
                {truncateText(item.name || item.transTitle, 10)}
              </Text>
            </Box>
          </VStack>
        </Flex>
      ))}
    </Box>
  );
};
