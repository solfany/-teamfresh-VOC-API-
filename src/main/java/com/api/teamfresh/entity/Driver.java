package com.api.teamfresh.entity;

import jakarta.persistence.*;

//운전사 엔티티
@Entity
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "carrier_id")
    private Carrier carrier;
    // ...
}