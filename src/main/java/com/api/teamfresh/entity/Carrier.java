package com.api.teamfresh.entity;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Carrier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    // 기사 정보 (One to Many 관계)
    @OneToMany(mappedBy = "carrier")
    private List<Driver> drivers = new ArrayList<>();
    // ...
}