import { Pressable, Text, View, TextInput, Button, Platform, Image, SafeAreaView } from "react-native";
import { useSignInMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../slice/AuthSlice";
import { useState, useEffect } from "react";
import { useDB } from "../hooks/useDB"; 
import { theme } from "../theme/index";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const [triggerSignIn, result] = useSignInMutation();
  const { insertSession } = useDB(); 

  useEffect(() => {
    if (result?.data && result.isSuccess) {
      (async () => {
        try {
          if (Platform.OS !== "web") {
            await insertSession({
              email: result.data.email,
              localId: result.data.localId,
              token: result.data.idToken,
            });
          }
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
            })
          );
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [result]);

  const onSubmit = () => {
    triggerSignIn({email, password, returnSecureToken: true});
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={require("../assets/images/fondo.jpg")}
        className="absolute inset-0"
        style={{ resizeMode: 'cover' }}
      />
      <SafeAreaView className="flex-1 justify-center items-center w-11/12 rounded-lg py-5">
        <View className="w-full p-5 rounded-lg items-center space-y-4">
          <Text className="text-2xl text-white">Logueate</Text>
          <TextInput
            className="w-full p-2 border border-gray-400 rounded text-white"
            placeholder="Email"
            placeholderTextColor="lightgray"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="w-full  my-3 p-2 border border-gray-400 rounded text-white"
            placeholder="Password"
            placeholderTextColor="lightgray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button  onPress={onSubmit} title="Entrar" color={theme.bgWhite(0.3)} />
          
          <Text className="text-sm text-white">Sin cuenta?</Text>

          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-sm text-blue-500">Registro</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;
