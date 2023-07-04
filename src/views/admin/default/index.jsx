import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// Chakra imports
import {
  Box,
  Button,
  Icon,
  SimpleGrid,
  Flex,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Text,
  VStack,
  Textarea,
} from "@chakra-ui/react";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";

import {
  FaUsers,
  FaRegCalendarCheck,
  FaRegCalendar,
  FaRegCalendarPlus,
} from "react-icons/fa";
import EventsTable from "views/admin/default/components/EventsTable";
import BusinessTable from "views/admin/default/components/BusinessTable";
import {
  columnsDataEvents,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { getAllUsers } from "redux/apiRequest";
import { createAxios } from "createInstance";
import { loginSuccess } from "redux/authSlice";
import Card from "components/card/Card";

export default function UserReports() {
  const [evensData, setEventsData] = useState([]);

  const user = useSelector((state) => state.auth.login?.currentUser);
  const allUsers = useSelector((state) => state.user?.users.allUsers);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialRef = React.useRef(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await await axiosJWT.get("/event/", {
          headers: {
            token: `Bearer ${user?.accessToken}`,
          },
        });
        setEventsData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const formData = new FormData();
        formData.append("newsTitle", values.nameNews);
        formData.append("newsDescription", values.descNews);
        formData.append("newsPictureURL", values.picEvent[0]);
        console.log(formData);
        axiosJWT
          .post(`/news/createNews/${user?._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              token: `Bearer ${user?.accessToken}`,
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        resolve();
      }, 1000);
    });
  }
  // Chakra Color Mode
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 5, "2xl": 5 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  as={FaUsers}
                  color={"#4318FF"}
                  width="32px"
                  height="32px"
                />
              }
            />
          }
          name="Số lượng thành viên"
          value={Object.keys(allUsers).length + 1 || 0}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  as={FaRegCalendarCheck}
                  color={"#4318FF"}
                  width="32px"
                  height="32px"
                />
              }
            />
          }
          name="Tổng sự kiện"
          value="128"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  as={FaRegCalendar}
                  color={"#4318FF"}
                  width="32px"
                  height="32px"
                />
              }
            />
          }
          name="Sự kiện trong tháng"
          value="2"
        />
        <Card onClick={onOpen}>
          <Flex cursor={"pointer"}>
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  as={FaRegCalendarPlus}
                  color={"#4318FF"}
                  width="32px"
                  height="32px"
                />
              }
            />
            <Text m={4}>Thêm tin tức</Text>
          </Flex>
          <Modal
            isCentered
            initialFocusRef={initialRef}
            onClose={onClose}
            isOpen={isOpen}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Thêm tin tức mới</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <VStack spacing={4}>
                    <FormControl isInvalid={errors.nameNews}>
                      <FormLabel htmlFor="nameNews">Tên tin tức</FormLabel>
                      <Input
                        id="nameNews"
                        placeholder="Tên tin tức"
                        {...register("nameNews", {
                          required: "This is required",
                          minLength: {
                            value: 4,
                            message: "Minimum length should be 4",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.nameNews && errors.nameNews.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.descNews}>
                      <FormLabel htmlFor="descNews">Nội dung</FormLabel>
                      <Textarea
                        id="descNews"
                        placeholder="Nội dung tin tức"
                        size="lg"
                        {...register("descNews", {
                          required: "This is required",
                          minLength: {
                            value: 4,
                            message: "Minimum length should be 4",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.descNews && errors.descNews.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="picEvent">Ảnh tin tức</FormLabel>
                      <Input
                        id="picEvent"
                        variant="flushed"
                        type="file"
                        name="picEvent"
                        {...register("picEvent")}
                      />
                    </FormControl>
                  </VStack>
                  <Button
                    colorScheme="blue"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Tạo sự kiện
                  </Button>
                  <Button colorScheme="red" m={5} onClick={onClose}>
                    Đóng
                  </Button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <EventsTable columnsData={columnsDataEvents} tableData={evensData} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <BusinessTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <MiniCalendar h="100%" minW="100%" selectRange={false} />
      </SimpleGrid>
    </Box>
  );
}
