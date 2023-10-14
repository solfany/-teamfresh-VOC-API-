package com.api.teamfresh.entity;

import jakarta.persistence.*;

//고객의 소리 엔티티
@Entity
public class VOC {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //아이디
    private String content; // 본문
    private String reason;  //이유
    private String liableParty;  // 고객사 또는 운송사
    @OneToOne(mappedBy = "voc")
    private Penalty penalty;   //패널티
    @OneToOne(mappedBy = "voc")
    private Compensation compensation; //보상
    // ...
}