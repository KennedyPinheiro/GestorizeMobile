import React, { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

type Props = {
    label: string;
    value?: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    maximumDate?: Date;
};

const toDate = (v?: string | null) => {
    const m = v?.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    return m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date(2000, 0, 1);
};

const toText = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;

const DateField = ({ label, value, onChange, placeholder = "DD/MM/AAAA", maximumDate }: Props) => {
    const [show, setShow] = useState(false);

    const handleChange = (e: DateTimePickerEvent, date?: Date) => {
        if (Platform.OS === "android") setShow(false);
        if (e.type === "set" && date) onChange(toText(date));
    };

    return (
        <View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setShow(true)} style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <Text style={[styles.value, !value && styles.placeholder]}>{value || placeholder}</Text>
            </TouchableOpacity>

            {show && (
                <>
                    <DateTimePicker
                        value={toDate(value)}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        maximumDate={maximumDate}
                        onChange={handleChange}
                    />
                    {Platform.OS === "ios" && (
                        <TouchableOpacity onPress={() => setShow(false)} style={styles.ok}>
                            <Text style={styles.okText}>OK</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
};

export default DateField;

const styles = StyleSheet.create({
    container: { borderWidth: 1, borderColor: "#000", borderRadius: 15, paddingVertical: 10, paddingHorizontal: 20, marginVertical: 10, backgroundColor: "#fff" },
    label: { fontSize: 13, color: "#6e6e6e", fontWeight: "bold", marginBottom: 5 },
    value: { fontSize: 20, fontWeight: "bold", color: "#111" },
    placeholder: { color: "#999", fontWeight: "normal" },
    ok: { alignSelf: "flex-end", paddingHorizontal: 16, paddingVertical: 6 },
    okText: { fontWeight: "800", color: "#062046" },
});