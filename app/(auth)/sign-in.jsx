import { View, Text , Image, ScrollView, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../../constants';
import { Link } from 'expo-router';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { router } from 'expo-router';

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password:""
  })

  const[isSubmit , setIsSubmit] = useState(false)

  const submit =  async () => {
    if(!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the details')
    }
    setIsSubmit(true);
    try{
      await signIn(form.email,form.password);

      //set to global state
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      Alert.alert("Success", "User signed in successfully");
      router.replace('/home');
    }catch(error){
      Alert.alert('Error', error.message);
    }finally{
      setIsSubmit(false);
    }
    
  }

  return (
    <SafeAreaView className="bg-primary h-full"
    >
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image 
            source={images.logo}
            resizeMode='contain' className="w-[115px] h-[34px]"
          />
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">Log in to Aora</Text>
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e)=> setForm({...form,
              email: e
            })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e)=> setForm({...form,
              password: e
            })}
            otherStyles="mt-7"
            
          />
          <CustomButton 
            title= "Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmit}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn