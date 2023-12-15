import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Input,
  Spinner,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import * as PropTypes from "prop-types";

export function ReservationList() {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [toss, setToss] = useState([]);

  useEffect(() => {
    axios.get("/api/toss/id/" + params.get("userId")).then((response) => {
      setToss(response.data);
    });
  }, [location]);

  return (
    <Center m={10}>
      <Card w={"80%"}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>
              <CardHeader textAlign={"center"} m={5}>
                <Heading>항공 / 버스 예약 관리</Heading>
              </CardHeader>
            </Tab>
            <Tab>
              <CardHeader textAlign={"center"} m={5}>
                <Heading>호텔 예약 관리</Heading>
              </CardHeader>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CardBody>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>주문번호</Th>
                      <Th>상품명 </Th>
                      <Th>출발시간 </Th>
                      <Th>도작시간 </Th>
                      <Th>요청사항</Th>
                      <Th>예약번호</Th>
                      <Th>가격</Th>
                      {/*<Th>상태</Th>*/}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {toss.map((toss) => (
                      <Tr key={toss.id} _hover={{ cursor: "pointer" }}>
                        <Td>{toss.tossid}</Td>
                        <Td>{toss.transTitle}</Td>
                        <Td>{toss.transStartDate}</Td>
                        <Td>{toss.transEndDate}</Td>
                        <Td>{toss.request}</Td>
                        <Td>{toss.reservation}</Td>
                        <Td>{toss.amount}</Td>
                        {/*<Td>{toss.db 안만듬 }</Td>*/}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Center>
    //     <CardHeader textAlign={"center"} m={10}>
    //       <Heading>예약내역</Heading>
    //     </CardHeader>
    //
    //     <CardBody>
    //       <Table>
    //         <Thead>
    //           <Tr>
    //             <Th>주문번호</Th>
    //             <Th>상품명 </Th>
    //             <Th>출발시간 </Th>
    //             <Th>도작시간 </Th>
    //             <Th>요청사항</Th>
    //             <Th>예약번호</Th>
    //             <Th>가격</Th>
    //             {/*<Th>상태</Th>*/}
    //           </Tr>
    //         </Thead>
    //         <Tbody>
    //           {toss.map((toss) => (
    //             <Tr key={toss.id} _hover={{ cursor: "pointer" }}>
    //               <Td>{toss.tossid}</Td>
    //               <Td>{toss.transTitle}</Td>
    //               <Td>{toss.transStartDate}</Td>
    //               <Td>{toss.transEndDate}</Td>
    //               <Td>{toss.request}</Td>
    //               <Td>{toss.reservation}</Td>
    //               <Td>{toss.amount}</Td>
    //               {/*<Td>{toss.db 안만듬 }</Td>*/}
    //             </Tr>
    //           ))}
    //         </Tbody>
    //       </Table>
    //     </CardBody>
    //   </Card>
    // </Center>
  );
}
