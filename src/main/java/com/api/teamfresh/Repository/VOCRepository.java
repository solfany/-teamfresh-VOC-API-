package com.api.teamfresh.Repository;

import com.api.teamfresh.entity.VOC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VOCRepository extends JpaRepository<VOC, Long> {}