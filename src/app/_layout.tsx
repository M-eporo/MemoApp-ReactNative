import { Stack } from 'expo-router';

const Layout = () => {
    return <Stack 
        screenOptions={{
            headerStyle: {
                backgroundColor: '#467fd3',
                
            },
            headerTintColor: "#fff",
            headerTitle: "Memo App",
            headerTitleAlign: "center",
            headerBackTitle: "Back",
            
            headerTitleStyle: {
                fontSize: 22,
                fontWeight: "bold",
            }
        }}
    />
};

export default Layout;