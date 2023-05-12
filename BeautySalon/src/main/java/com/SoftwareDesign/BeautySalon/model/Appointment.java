package com.SoftwareDesign.BeautySalon.model;

import com.SoftwareDesign.BeautySalon.model.wrapper.XMLLocalDateTimeAdapter;
import jakarta.persistence.*;
import jakarta.xml.bind.annotation.*;
import jakarta.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Appointment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @XmlJavaTypeAdapter(XMLLocalDateTimeAdapter.class)
    private LocalDateTime dateTime;

    @ManyToMany
    @JoinTable(
            name = "appointment_beauty_service",
            joinColumns = @JoinColumn(name = "appointment_id"),
            inverseJoinColumns = @JoinColumn(name = "beauty_service_id"))
    @ToString.Exclude
    private List<BeautyService> beautyServices;

    private BigDecimal totalPrice = new BigDecimal(0);

    public Appointment(Long id, Client client, Employee employee, LocalDateTime dateTime) {
        this.id = id;
        this.client = client;
        this.employee = employee;
        this.dateTime = dateTime;
        this.beautyServices = new ArrayList<BeautyService>();
        totalPrice = new BigDecimal(0);
    }

    public Appointment( Client client, Employee employee, LocalDateTime dateTime) {
        this.client = client;
        this.employee = employee;
        this.dateTime = dateTime;
        this.beautyServices = new ArrayList<>();
        totalPrice = new BigDecimal(0);
    }

    public void computeTotalPrice() {
        for(BeautyService bs: beautyServices) {
            totalPrice = totalPrice.add(bs.getPrice());
        }
    }

    public void addBeautyService(BeautyService beautyService) {
        beautyServices.add(beautyService);
        totalPrice = totalPrice.add(beautyService.getPrice());
    }

    public void setBeautyServices(List<BeautyService> beautyServices) {
        totalPrice = new BigDecimal(0);
        this.beautyServices = beautyServices;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", client=" + client +
                ", employee=" + employee +
                ", dateTime=" + dateTime +
                ", totalPrice=" + totalPrice +
                '}';
    }
}
