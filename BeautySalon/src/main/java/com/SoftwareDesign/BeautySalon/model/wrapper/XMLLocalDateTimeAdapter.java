package com.SoftwareDesign.BeautySalon.model.wrapper;

import jakarta.xml.bind.annotation.adapters.XmlAdapter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class XMLLocalDateTimeAdapter extends XmlAdapter<String, LocalDateTime> {
    private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @Override
    public LocalDateTime unmarshal(String value) {
        return LocalDateTime.parse(value, formatter);
    }

    @Override
    public String marshal(LocalDateTime value) {
        return value.format(formatter);
    }

}
