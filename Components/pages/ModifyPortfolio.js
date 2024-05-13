import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import GetCurrentPrice from "../utils/GetCurrentPrice";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import urls from "../utils/urls";
import { getUsertoken } from "../utils/localStorageUtils";
import { arraysEqual, deepCopy } from "../utils/utils";

const ModifyPortfolio = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [rebalances, setRebalances] = useState([]);
  const [rebalancesOffer, setRebalancesOffer] = useState([]);

  const ex_data = [
    {
      ticker: "005930",
      name: "삼성전자",
      number: 3,
      isBuy: true,
    },
    {
      ticker: "003550",
      name: "LG",
      number: 3,
      isBuy: true,
    },
  ];

  const fetchModify = async () => {
    try {
      const token = await getUsertoken();
      const response = await fetch(`${urls.springUrl}/api/rebalancing/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModify = async () => {
    if (!arraysEqual(rebalances, rebalancesOffer)) {
      console.log(rebalancesOffer);
      console.log(rebalances);
      console.log("다릅니다.");
    }
  };

  const fetchAllCurrent = async (tickerList) => {
    const result = await Promise.all(tickerList.map(GetCurrentPrice));
    return result;
  };

  const handleChangePrices = (index, value) => {
    const newRebalances = [...rebalances];
    newRebalances[index].price = value; // 입력받은 값을 숫자로 변환하여 저장
    setRebalances(newRebalances);
  };

  const handleChangeState = (index, value) => {
    const newRebalances = [...rebalances];
    newRebalances[index].isBuy = value;
    setRebalances(newRebalances);
  };

  const handleChangeNumber = (index, value) => {
    const newRebalances = [...rebalances];
    if (value <= 99) newRebalances[index].number = value;
    setRebalances(newRebalances);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const stockList = route.params.list;
        const tickerList = stockList.map((item) => item.ticker);
        const currentPrices = await fetchAllCurrent(tickerList);
        const rebalancesWithCurrent = stockList.map((item, index) => ({
          ...item,
          price: currentPrices[index].currentPrice,
        }));

        const deepcopyResult1 = deepCopy(rebalancesWithCurrent);
        const deepcopyResult2 = deepCopy(rebalancesWithCurrent);

        setRebalancesOffer(deepcopyResult1);
        setRebalances(deepcopyResult2);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.rebalanceContainer}>
          {rebalances.map((item, index) => (
            <View style={styles.rebalanceBlock} key={index}>
              <View>
                <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>
                  {item.name}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputTextContainer}>
                  <TextInput
                    style={styles.input_Amount}
                    keyboardType="numeric"
                    value={item.price}
                    onChangeText={(text) => handleChangePrices(index, text)}
                    placeholder={rebalancesOffer[index].price.toString()}
                    placeholderTextColor="#bbb"
                  />
                  <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    원에&nbsp;&nbsp;
                  </Text>
                  <TextInput
                    style={styles.input_Amount}
                    keyboardType="numeric"
                    value={item.number.toString()}
                    placeholder={rebalancesOffer[index].number.toString()}
                    placeholderTextColor="#bbb"
                    onChangeText={(text) => handleChangeNumber(index, text)}
                  />
                  <Text style={{ fontWeight: "bold", fontSize: 17 }}>주를</Text>
                </View>
                <View style={styles.tradeButtonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.tradeButton,
                      item.isBuy ? { backgroundColor: "#6495ED" } : "",
                    ]}
                    onPress={() => handleChangeState(index, true)}
                  >
                    <Text
                      style={[
                        { fontSize: 18 },
                        item.isBuy ? { color: "white" } : "",
                      ]}
                    >
                      매수
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tradeButton,
                      !item.isBuy ? { backgroundColor: "#6495ED" } : "",
                    ]}
                    onPress={() => handleChangeState(index, false)}
                  >
                    <Text
                      style={[
                        { fontSize: 18 },
                        !item.isBuy ? { color: "white" } : "",
                      ]}
                    >
                      매도
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => handleModify()}>
        <Text style={{ fontSize: 18, color: "white" }}>수정</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    padding: 5,
    backgroundColor: "#f5f5f5",
  },
  rebalanceContainer: {
    justifyContent: "flex-start",
  },
  rebalanceBlock: {
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginTop: 10,
  },
  inputTextContainer: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input_Amount: {
    justifyContent: "center", // 가로 방향에서 중앙 정렬
    alignItems: "center",
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 12,
    marginHorizontal: 6,
    fontSize: 18,
  },
  tradeButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexGrow: 1,
  },
  tradeButton: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#aaa",
  },
  button: {
    justifyContent: "center", // 가로 방향에서 중앙 정렬
    backgroundColor: "#6495ED",
    alignItems: "center",
    borderRadius: 10,
    padding: 18,
    margin: 5,
  },
});

export default ModifyPortfolio;
