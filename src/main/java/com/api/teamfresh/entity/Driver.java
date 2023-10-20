package com.api.teamfresh.entity;

import com.api.teamfresh.dto.DriverDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
@Data
@Entity
public class Driver {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "carrier_id")
  private Carrier carrier;

  @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
  private List<VOC> vocs;  // This driver's related claims

  private String driverCode;  // Driver's code
  private String driverType;  // Driver's type
  private String phoneNum;    // Contact number

  @Temporal(TemporalType.DATE)
  private Date creationDate;  // Creation date

  @Temporal(TemporalType.DATE)
  private Date updateDate;    // Update date

  private int penaltyCount = 0;

  public void setCarrier(Carrier carrier) {
    this.carrier = carrier;
  }

  public DriverDto toDto() {
    DriverDto dto = new DriverDto();

    dto.setId(this.id);
    dto.setCarrierId(this.carrier != null ? this.carrier.getId() : null);
    dto.setDriverCode(this.driverCode);
    dto.setDriverType(this.driverType);
    dto.setPhoneNum(this.phoneNum);
    dto.setCreationDate(this.creationDate);
    dto.setUpdateDate(this.updateDate);
    dto.setPenaltyCount(this.penaltyCount);

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
