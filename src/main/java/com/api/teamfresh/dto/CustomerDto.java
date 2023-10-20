package com.api.teamfresh.dto;

import com.api.teamfresh.entity.Customer;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
public class CustomerDto {

  private Long id;
  private String customerType;
  private String customerCode;
  private Date creationDate;
  private Date updateDate;
  private List<KeeperDto> keepers;  // 타입을 List로 변경

  public Customer toEntity() {
    Customer customer = new Customer();

    customer.setId(this.id);
    customer.setCustomerType(this.customerType);
    customer.setCustomerCode(this.customerCode);
    customer.setCreationDate(this.creationDate);
    customer.setUpdateDate(this.updateDate);

    // Note: Assuming Keeper entity and its transformation logic is available,
    // you can convert keepers list here. But for now, I'm skipping this part.

    return customer;
  }
}
