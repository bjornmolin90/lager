import { View, Text, TextInput, Button } from "react-native";
import { Typography, Form, Base } from '../../styles';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{title}</Text>
            <Text style={Typography.label}>E-post</Text>
            <TextInput
                style={Form.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                testID="email-field"
            />
            <Text style={Typography.label}>Lösenord</Text>
            <TextInput
                style={Form.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                autoCapitalize="none"
                secureTextEntry={true}
                testID="password-field"
            />
            <Button
                title={title}
                onPress={() => {
                    submit();
                }}
                accessibilityLabel={`${title} genom att trycka`}
            />
            {title === "Logga in" &&
                <Button
                    title="Registrera istället"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />
            }
        </View>
    );
};
