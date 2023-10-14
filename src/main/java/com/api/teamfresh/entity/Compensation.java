package com.api.teamfresh.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

// 보상 엔티티
@Entity
public class Compensation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal amount;
    @OneToOne
    @JoinColumn(name = "voc_id")
    private VOC voc;
    // ...
}