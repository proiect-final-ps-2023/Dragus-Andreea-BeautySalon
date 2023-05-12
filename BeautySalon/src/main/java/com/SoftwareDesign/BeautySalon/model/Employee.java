package com.SoftwareDesign.BeautySalon.model;

import jakarta.persistence.*;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlTransient;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Employee implements UserDetails, Serializable {
    @Id
    private Long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private UserType userType;
    private String userName;
    private String password;

    @Enumerated(EnumType.STRING)
    private EmployeeType employeeType;
    private boolean loggedIn;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "employee")
    @ToString.Exclude
    @XmlTransient
    private List<Appointment> appointments = new ArrayList<Appointment>();


    public Employee(Long id, String name, UserType userType, String username, String password, EmployeeType employeeType) {
        this.id = id;
        this.name = name;
        this.userType = userType;
        this.userName = username;
        this.password = password;
        this.employeeType = employeeType;

    }

    public Employee( String name, UserType userType, String username, String password, EmployeeType employeeType) {
        this.name = name;
        this.userType = userType;
        this.userName = username;
        this.password = password;
        this.employeeType = employeeType;

    }

    public void addAppointment(Appointment appointment) {
        appointments.add(appointment);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userType.name()));
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getUserName() {
        return userName;
    }
}
