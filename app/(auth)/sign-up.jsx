import { View, Text , Image, ScrollView, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../../constants';
import { Link, router } from 'expo-router';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password:""
  })

  const[isSubmit , setIsSubmit] = useState(false)

  const submit =  async () => {
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the details')
    }
    setIsSubmit(true);
    try{
      const result = await createUser(form.email,form.password,form.username);

      //set to global state

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
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">Sign Up to Aora</Text>

          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e)=> setForm({...form,
              username: e
            })}
            otherStyles="mt-10"
            
          />
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
            title= "Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmit}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp