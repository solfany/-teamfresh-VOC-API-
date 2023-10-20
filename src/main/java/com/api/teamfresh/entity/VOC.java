package com.api.teamfresh.entity;

import com.api.teamfresh.dto.VOCDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.Hibernate;

import java.util.Date;
@Data
@Entity
public class VOC {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;


  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "driver_id")
  private Driver driver; // 클레임과 관련된 기사

  private String vocContent;

  private Boolean verificationStatus;

  @Enumerated(EnumType.STRING)
  private ManagerType managerType;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "objection_id", referencedColumnName = "id")
  @JsonIgnore
  private Objection objection;

  @Temporal(TemporalType.DATE)
  private Date creationDate;

  @Temporal(TemporalType.DATE)
  private Date updateDate;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "compensation_id")
  private Compensation compensation;

  @OneToOne(mappedBy = "voc", cascade = CascadeType.ALL)
  private Penalty penalty;

  @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
  @JoinColumn(name = "carrier_id")
  private Carrier carrier;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "customer_id")
  private Customer customer;

  public VOCDto toDto() {
    VOCDto dto = new VOCDto();
    dto.setId(this.id);
    dto.setVocContent(this.vocContent);
    dto.setVerificationStatus(this.verificationStatus);
    dto.setManagerType(this.managerType);
    dto.setCreationDate(this.creationDate);
    dto.setUpdateDate(this.updateDate);

    if (this.objection != null) dto.setObjection(this.objection.toDto());
    if (this.compensation != null) dto.setCompensation(this.compensation.toDto());
    if (this.penalty != null) dto.setPenalty(this.penalty.toDto());
    if (this.carrier != null) dto.setCarrier(this.carrier.toDto());
    if (this.customer != null) dto.setCustomer(this.customer.toDto());
    if (this.driver != null) {
      Hibernate.initialize(this.driver);
      dto.setDriver(this.driver.toDto());
    }


    return dto;
  }
  @PrePersist
  protected void onCreate() {
    creationDate = new Date();
    updateDate = creationDate;  // Optionally set updateDate on creation too.
  }

  @PreUpdate
  protected void onUpdate() {
    updateDate = new Date();
  }
}
