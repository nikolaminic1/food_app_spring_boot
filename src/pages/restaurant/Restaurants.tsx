import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import { MainRestaurantDiv } from "../../style/RestaurantPages";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Status } from "../../app/service/Status";
import CSpin from "../../layout/CSpin";
import { getRestaurantsList } from "../../app/service/restaurants";
import RestaurantCard from "../../components/RestaurantCard";

interface RestaurantsProps {}

const Restaurants: FC<RestaurantsProps> = ({}): ReactElement => {
  const restaurants = useAppSelector((state: RootState) => {
    return state.restaurant.restaurantsList;
  });
  const dispatch = useAppDispatch();
  const run = useRef(false);
  useEffect(() => {
    if (run.current === false) {
      dispatch(getRestaurantsList())
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      run.current = true;
    };
  }, []);

  return (
    <>
      {restaurants.status == Status.LOADING ? (
        <CSpin />
      ) : (
        <MainRestaurantDiv>
          <div className="main-wrapper">
            <div className="title"></div>
            <div className="list">
              <div className="row gx-4 gy-4">
                {restaurants?.restaurants?.map((restaurant, i) => {
                  return (
                    <div className="col-lg-4 col-md-6 col-12" key={i}>
                      <RestaurantCard restaurant={restaurant} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </MainRestaurantDiv>
      )}
    </>
  );
};

export default Restaurants;
