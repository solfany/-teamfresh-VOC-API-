package com.api.teamfresh.entity;

import jakarta.persistence.*;

//패널티 엔티티
@Entity
public class Penalty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    @OneToOne
    @JoinColumn(name = "voc_id")
    private VOC voc;
    // ...
}