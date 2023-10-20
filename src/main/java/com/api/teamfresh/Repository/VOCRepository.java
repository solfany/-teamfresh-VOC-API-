package com.api.teamfresh.Repository;

import com.api.teamfresh.entity.ManagerType;
import com.api.teamfresh.entity.VOC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VOCRepository extends JpaRepository<VOC, Long> {

  // managerType을 기반으로 VOCs를 가져오는 메서드
  @Query("SELECT DISTINCT v FROM VOC v " +
    "LEFT JOIN FETCH v.objection o " +
    "LEFT JOIN FETCH v.penalty p " +
    "LEFT JOIN FETCH v.compensation c " +
    "LEFT JOIN FETCH v.carrier cr " +    // Carrier 정보 가져오기
    "LEFT JOIN FETCH cr.drivers d " +   // Driver 정보 가져오기 (Carrier 내의 Driver 리스트)
    "LEFT JOIN FETCH v.customer cu " +  // Customer 정보 가져오기
    "LEFT JOIN FETCH cu.keepers k " +   // Keeper 정보 가져오기 (Customer 내의 Keeper 리스트)
    "WHERE v.managerType = :managerType")
  List<VOC> findAllWithJoinFetchByManagerType(@Param("managerType") ManagerType managerType);

  // 모든 VOCs를 가져오는 메서드
  @Query("SELECT DISTINCT v FROM VOC v " +
    "LEFT JOIN FETCH v.objection o " +
    "LEFT JOIN FETCH v.penalty p " +
    "LEFT JOIN FETCH v.compensation c " +
    "LEFT JOIN FETCH v.carrier cr " +
    "LEFT JOIN FETCH cr.drivers d " +
    "LEFT JOIN FETCH v.customer cu " +
    "LEFT JOIN FETCH cu.keepers k")
  List<VOC> findAllWithJoinFetch();

}
