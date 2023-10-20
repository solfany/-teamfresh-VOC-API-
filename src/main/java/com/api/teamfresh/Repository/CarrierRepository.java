package com.api.teamfresh.Repository;

import com.api.teamfresh.entity.Carrier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarrierRepository extends JpaRepository<Carrier, Long> {

  @Query("SELECT c FROM Carrier c WHERE c.carrierType = :carrierType")
  List<Carrier> findByCarrierType(@Param("carrierType") String carrierType);
}







